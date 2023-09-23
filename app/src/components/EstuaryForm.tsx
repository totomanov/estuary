import React, { useEffect, useState } from 'react'
import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from '@chakra-ui/react'
import estuaryArtifact from "../../../contracts/artifacts/src/Estuary.sol/Estuary.json";
import { useAccount, useContractReads, useContractWrite, usePrepareContractWrite } from 'wagmi'
import TokenPicker from './TokenPicker';
import { Token, getTokenContract, resolveTokenBySymbol, tokens } from '../tokens';
import { useDebounce } from 'usehooks-ts';
import { formatUnits, getAddress, isAddress, parseUnits } from 'viem'
import DurationPicker from './DurationPicker';
import erc20Abi from "../../../contracts/artifacts/src/interfaces/IERC20.sol/IERC20.json";
import { estuaryAddress } from '../constants';

type Props = {
    tokenBalances: { [symbol: string]: bigint },
    tokenAllowances: { [symbol: string]: bigint },
}

function EstuaryForm({ tokenBalances, tokenAllowances }: Props) {
    const [recipient, setRecipient] = useState('');
    const [isRecipientError, setRecipientError] = useState(true);
    const debouncedRecipient = useDebounce(recipient, 500);

    const [token, setToken] = useState<Token>(tokens[0]);
    const debouncedToken = useDebounce(token, 500)
    const [amount, setAmount] = useState('0');
    const [duration, setDuration] = useState('10000');

    const { address: userAddress } = useAccount();

    const hasBalance = userAddress ? tokenBalances[token.symbol] >= parseUnits(amount, token.decimals) : false;
    const hasAllowance = userAddress ? tokenAllowances[token.symbol] >= parseUnits(amount, token.decimals) : false;

    const isAmountError = +amount < 0 || parseUnits(amount, token.decimals) === 0n || !hasBalance;

    const prepareCreateStream = usePrepareContractWrite({
        address: estuaryAddress,
        abi: estuaryArtifact.abi,
        functionName: 'createStream',
        args: [debouncedRecipient, debouncedToken.address, parseUnits(amount, token.decimals), duration],
        enabled: hasAllowance && !isRecipientError && !isAmountError
    });

    const prepareApprove = usePrepareContractWrite({
        address: token.address as `0x${string}`,
        abi: erc20Abi.abi,
        functionName: 'approve',
        args: [estuaryAddress, parseUnits(amount, token.decimals)],
        enabled: !hasAllowance && !isRecipientError && !isAmountError
    });

    useEffect(() => {
        let isError = false;
        try {
            getAddress(recipient)
        } catch (e: unknown) {
            isError = true;
        }
        setRecipientError(isError);
    }, [recipient])

    const { write: writeCreateStream } = useContractWrite(prepareCreateStream.config)
    const { write: writeApprove } = useContractWrite(prepareApprove.config)

    return (
        <>
            <FormControl isInvalid={isRecipientError && recipient != ''}>
                <FormLabel>Recipient</FormLabel>
                <Input placeholder='0xc0ffeebabe...' onChange={(e) => setRecipient(e.target.value)} />
                {
                    isRecipientError && recipient != '' ?
                        <FormErrorMessage>Invalid recipient address</FormErrorMessage> :
                        <FormHelperText color="gray.400">
                            Enter the wallet address of the recipient
                        </FormHelperText>
                }
            </FormControl>

            <FormControl>
                <FormLabel>Token</FormLabel>
                <TokenPicker onSelected={(symbol) => {
                    const token = resolveTokenBySymbol(symbol);
                    setToken(token);
                }} />
                <FormHelperText color="gray.400">
                    Choose the token to send
                </FormHelperText>
            </FormControl>

            <FormControl isInvalid={!hasBalance}>
                <FormLabel>Amount</FormLabel>
                <Input type="number" placeholder='1234.56' onChange={(e) => setAmount(e.target.value)} />
                {
                    hasBalance ? (<FormHelperText color="gray.400">
                        Enter the amount of tokens to stream
                    </FormHelperText>) : (
                        <FormErrorMessage>
                            Insufficient {token.symbol} balance
                        </FormErrorMessage>
                    )
                }

            </FormControl>

            <FormControl>
                <FormLabel>Duration</FormLabel>
                <DurationPicker onSelected={(value) => {
                    setDuration(value);
                }} />
                <FormHelperText color="gray.400">
                    Choose the length of the flow
                </FormHelperText>
            </FormControl>

            <Button size="lg" colorScheme="pink" isDisabled={isRecipientError || isAmountError} mt={2} onClick={(e) => {
                e.preventDefault()
                !hasAllowance ? writeApprove?.() : writeCreateStream?.()
            }}>
                {
                    isRecipientError
                        ? `Invalid Recipient`
                        : isAmountError
                            ? 'Invalid Amount'
                            : !hasAllowance ? `Approve Estuary for ${amount} ${token.symbol}`
                                : `Stream ${amount} ${token.symbol}`
                }
            </Button>


            {prepareApprove.isError &&
                <Alert status='error' color="gray.700">
                    <AlertIcon />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{prepareApprove.error?.message}</AlertDescription>
                </Alert>}

            {prepareCreateStream.isError &&
                <Alert status='error' color="gray.700">
                    <AlertIcon />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{prepareCreateStream.error?.message}</AlertDescription>
                </Alert>}
        </>
    )
}

export default EstuaryForm

