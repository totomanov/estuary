import React from 'react'
import { Button, Flex, FormControl, FormHelperText, FormLabel, Grid, GridItem, Heading, Input, Text } from '@chakra-ui/react'
import Duration from './components/Duration'
import TokenPicker from './components/TokenPicker'
import FlowCard from './components/FlowCard'
import { Web3Button } from '@web3modal/react'


function App() {
  return (
    <Grid templateColumns='repeat(5, 1fr)' p={6}>

      <GridItem h='100%'>
        <Web3Button />
      </GridItem>

      <GridItem h='100%' colSpan={4}>
        <Flex direction="column" gap={6}>
          <Flex direction="column" gap={2}>
            <Heading size="lg">Flowing In</Heading>
            <Text size="sm" fontStyle="italic">You are not the recipient of any flows</Text>
          </Flex>
          <Flex direction="column" gap={2}>
            <Heading size="lg">Flowing Out</Heading>
            <FlowCard
              from={'bear.eth'}
              to={'v.eth'}
              token='wNEON' />
          </Flex>
          <Flex direction="column" maxW='lg' gap={2}>
            <Heading size="lg">Estuary</Heading>

            <FormControl>
              <FormLabel>Recipient</FormLabel>
              <Input placeholder='e.g. vitalik.eth or 0xc0ffeebabe...' />
              <FormHelperText>
                Enter the ENS or wallet address of the recipient
              </FormHelperText>
            </FormControl>

            <FormControl>
              <FormLabel>Token</FormLabel>
              <TokenPicker />
              <FormHelperText>
                Choose your token
              </FormHelperText>
            </FormControl>

            <FormControl>
              <FormLabel>Amount</FormLabel>
              <Input placeholder='12.546' />
              <FormHelperText>
                Enter the amount of tokens to stream
              </FormHelperText>
            </FormControl>

            <FormControl>
              <FormLabel>Duration</FormLabel>
              <Duration />
              <FormHelperText>
                Choose the length of the flow
              </FormHelperText>
            </FormControl>
            <Button size="lg">Create</Button>
          </Flex>
        </Flex>
      </GridItem>
    </Grid >
  )
}

export default App
