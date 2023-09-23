import React from 'react'
import { Grid, GridItem } from '@chakra-ui/react'

function App() {
  return (
    <Grid templateColumns='repeat(6, 1fr)'>

      <GridItem h='100%'>
        Left
      </GridItem>

      <GridItem h='100%' colSpan={4}>
        Center
      </GridItem>

      <GridItem h='100%'>
        Right
      </GridItem>
    </Grid>
  )
}

export default App
