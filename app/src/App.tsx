import React from 'react'
import { Flex, Grid, GridItem, Heading, Text } from '@chakra-ui/react'
import FlowCard from './components/FlowCard'
import { Web3Button } from '@web3modal/react'
import EstuaryForm from './components/EstuaryForm'


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
            <EstuaryForm />
          </Flex>
        </Flex>
      </GridItem>
    </Grid >
  )
}

export default App
