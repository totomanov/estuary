import React from 'react'
import { Button, Flex, FormControl, FormHelperText, FormLabel, Grid, GridItem, Heading, Input } from '@chakra-ui/react'
import Duration from './components/Duration'
import TokenPicker from './components/TokenPicker'

function App() {
  return (
    <Grid templateColumns='repeat(6, 1fr)'>

      <GridItem h='100%'>
        Left
      </GridItem>

      <GridItem h='100%' colSpan={4}>
        <Flex direction="column" gap={6}>
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
      </GridItem>

      <GridItem h='100%'>
        Right
      </GridItem>
    </Grid>
  )
}

export default App
