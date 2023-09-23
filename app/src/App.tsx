import React, { useEffect, useState } from 'react'
import { Flex, Grid, GridItem, Heading, Text, Image, Skeleton } from '@chakra-ui/react'
import { Web3Button } from '@web3modal/react'
import EstuaryForm from './components/EstuaryForm'
import { getTokenContract, tokens } from './tokens'
import { useAccount, useContractRead, useContractReads } from 'wagmi'
import { formatUnits } from 'viem'
import { estuaryAddress } from './constants'
import estuaryArtifact from "../../contracts/artifacts/src/Estuary.sol/Estuary.json";
import MyFlows, { Flow } from './components/MyFlows'
import AllFlows from './components/AllFlows'

function App() {
  const { address } = useAccount();
  const [tokenBalances, setTokenBalances] = useState<{
    [symbol: string]: bigint
  }>({});

  const [tokenAllowances, setTokenAllowances] = useState<{
    [symbol: string]: bigint
  }>({});

  const [flows, setFlows] = useState<Flow[]>([]);

  const { data: rawTokenData, isLoading: isTokenDataLoading } = useContractReads({
    contracts: tokens.map((token) => [
      {
        ...getTokenContract(token),
        functionName: 'balanceOf',
        args: [address]
      },
      {
        ...getTokenContract(token),
        functionName: 'allowance',
        args: [address, estuaryAddress]
      },
    ]).flat(),
    enabled: !!address,
  });

  const { data: rawFlowData, isLoading: isFlowDataLoading } = useContractRead({
    address: estuaryAddress,
    abi: estuaryArtifact.abi,
    functionName: 'getAllStreams',
  });

  useEffect(() => {
    console.log("Raw token data", rawTokenData);
    const newTokenBalances: { [symbol: string]: bigint } = {};
    const newTokenAllowances: { [symbol: string]: bigint } = {};

    for (let i = 0; i < (rawTokenData?.length ?? 0); i += 2) {
      const j = Math.floor(i / 2);
      newTokenBalances[tokens[j].symbol] = (rawTokenData?.[i]?.result ?? 0n) as bigint
      newTokenAllowances[tokens[j].symbol] = (rawTokenData?.[i + 1]?.result ?? 0n) as bigint
    }
    setTokenBalances(newTokenBalances);
    setTokenAllowances(newTokenAllowances);
  }, [rawTokenData, address]);

  useEffect(() => {
    console.log("Raw flow data", rawFlowData);
    setFlows(rawFlowData as Flow[]);
  }, [rawFlowData])

  return (
    <Grid templateColumns='repeat(6, 1fr)'>

      <GridItem h='100vh' bgColor="gray.900" py={6} px={8} color="white">
        <Flex direction="column" gap={6}>
          <Flex direction="column" gap={2}>
            <Heading size="lg">Welcome!</Heading>
            <Web3Button />
          </Flex>
          <Flex direction="column" gap={2}>
            <Heading size="lg">Balances</Heading>
            {tokens.map((token) => (
              <Flex direction="row" align="center" gap={2} key={token.symbol}>
                <Image w={6} h={6} src={token.logo} />
                <Text fontSize="md" fontWeight="semibold">{token.symbol}</Text>
                <Skeleton isLoaded={!isTokenDataLoading} height={5}>
                  <Text fontSize="sm" color="gray.300">{formatUnits(tokenBalances[token.symbol] ?? 0n, token.decimals)}</Text>
                </Skeleton>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </GridItem>

      <GridItem h='100vh' bgColor="gray.800" colSpan={3} py={6} px={8} color="white">
        <Flex direction="column" gap={6}>
          <Flex direction="column" maxW='lg' gap={4}>
            <Heading size="lg">Estuary</Heading>
            <EstuaryForm tokenBalances={tokenBalances} tokenAllowances={tokenAllowances} />
          </Flex>
        </Flex>
      </GridItem>

      <GridItem h='100vh' bgColor="gray.800" colSpan={2} py={6} px={8} color="white">
        <Flex direction="column" gap={6}>
          <Flex direction="column" gap={2}>
            <Heading size="lg">Feed</Heading>
            {!isFlowDataLoading && <AllFlows flows={flows} />}
          </Flex>
          <Flex direction="column" gap={2}>
          </Flex>
        </Flex>
      </GridItem>
    </Grid >
  )
}

export default App
