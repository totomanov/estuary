import React, { useEffect, useState } from 'react'
import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from '@chakra-ui/react'
import estuaryArtifact from "../../../contracts/artifacts/src/Estuary.sol/Estuary.json";
import { useAccount, useContractReads, useContractWrite, usePrepareContractWrite } from 'wagmi'
import TokenPicker from './TokenPicker';
import { Token, getTokenContract, resolveTokenBySymbol, tokens } from '../tokens';
import { useDebounce } from 'usehooks-ts';
import { isAddress } from 'viem'
import DurationPicker from './DurationPicker';
import erc20Abi from "../../../contracts/artifacts/src/interfaces/IERC20.sol/IERC20.json";

function EstuaryForm() {
    const [recipient, setRecipient] = useState('0xDaf1E1a15B8634280A07964e398B288bb8CF79e6');
    const isRecipientError = isAddress(recipient);
    const debouncedRecipient = useDebounce(recipient, 500);
    const [token, setToken] = useState<Token>(tokens[0]);
    const debouncedToken = useDebounce(token, 500)
    const [amount, setAmount] = useState('0');
    const [duration, setDuration] = useState('99999999999999');

    const { address: userAddress } = useAccount();

    const tokenContract = getTokenContract(token);
    const userTokenData = useContractReads({
        contracts: [{
            address: token.address as `0x${string}`,
            abi: erc20Abi.abi,
            functionName: 'balanceOf',
            args: [userAddress],
        }],
        enabled: !!userAddress
    });

    const { config, error, isError } = usePrepareContractWrite({
        address: '0xDaf1E1a15B8634280A07964e398B288bb8CF79e6',
        abi: estuaryArtifact.abi,
        functionName: 'createStream',
        args: [debouncedRecipient, debouncedToken.address, amount, duration],
        enabled: !isRecipientError
    });

    useEffect(() => {
        console.log(userTokenData.data);
    }, [userTokenData])

    const { write } = useContractWrite(config)

    return (
        <>
            <FormControl>
                <FormLabel>Recipient</FormLabel>
                <Input placeholder='e.g. vitalik.eth or 0xc0ffeebabe...' onChange={(e) => setRecipient(e.target.value)} />
                {
                    !isRecipientError ?
                        <FormHelperText>
                            Enter the ENS or wallet address of the recipient
                        </FormHelperText>
                        :
                        <FormErrorMessage>Invalid recipient address</FormErrorMessage>
                }
            </FormControl>

            <FormControl>
                <FormLabel>Token</FormLabel>
                <TokenPicker onSelected={(symbol) => {
                    const token = resolveTokenBySymbol(symbol);
                    setToken(token);
                }} />
                <FormHelperText>
                    Choose your token
                </FormHelperText>
            </FormControl>

            <FormControl>
                <FormLabel>Amount</FormLabel>
                <Input placeholder='12.546' onChange={(e) => setAmount(e.target.value)} />
                <FormHelperText>
                    Enter the amount of tokens to stream
                </FormHelperText>
            </FormControl>

            <FormControl>
                <FormLabel>Duration</FormLabel>
                <DurationPicker onSelected={(value) => {
                    setDuration(value);
                }} />
                <FormHelperText>
                    Choose the length of the flow
                </FormHelperText>
            </FormControl>
            <Button size="lg" colorScheme="pink" disabled={!write} onClick={(e) => {
                e.preventDefault()
                write?.()
            }}>Create</Button>

            {isError &&
                <Alert status='error'>
                    <AlertIcon />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error?.message}</AlertDescription>
                </Alert>}
        </>
    )
}

export default EstuaryForm

