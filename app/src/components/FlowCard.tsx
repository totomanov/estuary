import React from 'react'
import { Card, Button, ButtonGroup, Flex, Image, Text, Progress } from "@chakra-ui/react"

import AddressBadge from './AddressBadge'
import { Token } from '../tokens'
import { useAccount } from 'wagmi'
import { formatUnits } from 'viem'



type Props = {
    from: string,
    to: string,
    token: Token,
    amount: bigint,
    start: number,
    end: number
}

function FlowCard({ from, to, token, amount, start, end }: Props) {
    const now = Math.floor(Date.now() / 1000);
    const hasEnded = now >= end;
    const progress = hasEnded ? 100 : now <= start ? 0 : Math.floor(100 * (now - start) / (end - start));

    const { address } = useAccount();
    const fromIsUser = address ? from.toLowerCase() === address.toLowerCase() : false;
    const toIsUser = address ? to.toLowerCase() === address.toLowerCase() : false;

    return (
        <Card maxW={64} rounded="md" p={4} gap={4} bgColor="gray.700" color="white">
            <Flex direction="column" gap={1}>
                <Flex direction="row" align="center" gap={1}>
                    <AddressBadge label={fromIsUser ? 'You' : from} colorScheme={fromIsUser ? 'pink' : 'gray'} variant={fromIsUser ? "solid" : "outline"} />
                    →
                    <AddressBadge label={toIsUser ? 'You' : to} colorScheme={toIsUser ? 'pink' : 'gray'} variant={toIsUser ? "solid" : "outline"} />
                </Flex>
                <Flex direction="row" align="end" gap={1}>
                    <Image src={token.logo} w={6} h={6} />
                    <Text fontSize="md" fontWeight="semibold">{token.symbol}</Text>
                    <Text fontSize="xs" color="gray.300">
                        {`${formatUnits(amount * BigInt(progress), token.decimals + 2)}`}/{`${formatUnits(amount, token.decimals)}`}
                    </Text>
                </Flex>
                <Progress hasStripe colorScheme="pink" value={progress} rounded="md" />
            </Flex>
            <ButtonGroup spacing='2'>
                {
                    toIsUser && (
                        <Button variant='solid' colorScheme='pink' size="sm">
                            Claim
                        </Button>
                    )
                }
                {
                    fromIsUser && (
                        <Button variant='ghost' colorScheme='pink' size="sm">
                            Cancel
                        </Button>
                    )
                }
            </ButtonGroup>
        </Card>
    )
}

export default FlowCard;