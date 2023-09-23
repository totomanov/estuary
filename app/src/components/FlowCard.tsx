import React from 'react'
import { Card, CardFooter, CardBody, Button, ButtonGroup, Flex, Image, Text, Progress } from "@chakra-ui/react"

import wNEON from "../images/wNEON.svg"


type Props = {
    from: string,
    to: string,
    token: string
}

function FlowCard({ from, to, token }: Props) {
    return (
        <Card maxW={64} rounded="md" p={3}>
            <Flex direction="column">
                <Flex direction="row" align="center">
                    <Image src={wNEON} w={6} h={6} />
                    <Text size="lg" fontStyle="bold">
                        12.34
                    </Text>
                </Flex>
                <Text size="sm">From: {from}</Text>
                <Progress hasStripe value={64} />
            </Flex>
            <ButtonGroup spacing='2'>
                <Button variant='solid' colorScheme='pink' size="sm">
                    Claim
                </Button>
                <Button variant='ghost' colorScheme='pink' size="sm">
                    Cancel
                </Button>
            </ButtonGroup>
        </Card>
    )
}

export default FlowCard;