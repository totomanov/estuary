import React, { useEffect, useState } from 'react'
import { Flex, Grid, GridItem, Heading, Text, Image, Skeleton } from '@chakra-ui/react'
import FlowCard from './components/FlowCard'
import { Web3Button } from '@web3modal/react'
import EstuaryForm from './components/EstuaryForm'
import { getTokenContract, tokens } from './tokens'
import { useAccount, useContractReads } from 'wagmi'
import { formatUnits } from 'viem'

function App() {
  const { address } = useAccount();
  const [tokenBalances, setTokenBalances] = useState<{
    [symbol: string]: bigint
  }>({});
  const [tokenAllowances, setTokenAllowances] = useState<{
    [symbol: string]: bigint
  }>({});

  const { data: rawData, isError, isLoading } = useContractReads({
    contracts: tokens.map((token) => [
      {
        ...getTokenContract(token),
        functionName: 'balanceOf',
        args: [address]
      },
      {
        ...getTokenContract(token),
        functionName: 'allowance',
        args: [address,]
      },
    ]).flat(),
    enabled: !!address,
  });

  useEffect(() => {
    console.log("raw", rawData);
    console.log("input", tokens.map((token) => [
      {
        ...getTokenContract(token),
        functionName: 'balanceOf',
        args: [address]
      },
    ]).flat(),);
    const newTokenBalances: { [symbol: string]: bigint } = {};
    rawData?.forEach(({ result }, i) => {
      newTokenBalances[tokens[i].symbol] = result as bigint
    })
    setTokenBalances(newTokenBalances);
  }, [rawData]);


  return (
    <Grid templateColumns='repeat(6, 1fr)'>

      <GridItem h='100vh' bgColor="gray.900" py={6} px={8} color="white">
        <Flex direction="column" gap={6}>
          <Heading size="lg">Welcome!</Heading>
          <Web3Button />
          <Flex direction="column" gap={2}>
            <Heading size="lg">Balances</Heading>
            {tokens.map((token) => (
              <Flex direction="row" align="center" gap={2} key={token.symbol}>
                <Image w={8} h={8} src={token.logo} />
                <Flex direction="column" gap={0}>
                  <Text fontSize="md" fontWeight="semibold">{token.symbol}</Text>
                  <Skeleton isLoaded={!isLoading} height={3}>
                    <Text fontSize="xs" color="gray.300">{formatUnits(tokenBalances[token.symbol] ?? 0n, token.decimals)}</Text>
                  </Skeleton>
                </Flex>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </GridItem>

      <GridItem h='100vh' bgColor="gray.800" colSpan={5} py={6} px={8} color="white">
        <Flex direction="column" gap={6}>
          <Flex direction="column" gap={2}>
            <Heading size="lg">Flows</Heading>
            <FlowCard
              from='bear.eth'
              to='0x074d702BEb559Ce45DD65E39eC19F3505B184658'
              token={tokens[2]}
              amount={10000000000n}
              start={Math.floor(Date.now() / 1000) - 100000}
              end={Math.floor(Date.now() / 1000) + 20000}
            />
          </Flex>
          <Flex direction="column" maxW='lg' gap={2}>
            <Heading size="lg">Estuary</Heading>
            <EstuaryForm />
          </Flex>
        </Flex>
      </GridItem>
    </Grid >
  )
}

export default App
