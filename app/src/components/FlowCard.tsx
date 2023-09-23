import React from 'react'
import { Card, Button, Flex, Image, Text, Progress, Divider, Box } from "@chakra-ui/react"

import AddressBadge from './AddressBadge'
import { resolveTokenByAddress } from '../tokens'
import { formatUnits } from 'viem'
import { Flow } from './MyFlows'
import { FaClock, FaCoins } from "react-icons/fa";
import moment from 'moment'


type Props = {
    flow: Flow,
    isRecipient: boolean,
    isSponsor: boolean
}

function FlowCard({ flow, isRecipient, isSponsor }: Props) {
    const now = BigInt(Math.floor(Date.now() / 1000));
    const { start, end, sponsor, recipient, amount } = flow.stream;
    const hasEnded = now >= end;
    const progress = hasEnded ? 100n : now <= start ? 0n : (100n * (now - start)) / (end - start);
    const token = resolveTokenByAddress(flow.stream.token);

    const timeLeft = hasEnded ? 'ended' : moment().add(Number(end - now), "seconds").fromNow();

    return (
        <Card w={64} rounded="md" px={4} py={4} bgColor="gray.700" color="white" >
            <Flex direction="column" gap={4}>
                <Flex direction="row" justify="space-between" align="center">
                    <Flex direction="row" align="center" gap={1}>
                        <AddressBadge label={isSponsor ? 'You' : sponsor} colorScheme={isSponsor ? 'pink' : ''} variant={isSponsor ? "solid" : "outline"} />
                        →
                        <AddressBadge label={isRecipient ? 'You' : recipient} colorScheme={isRecipient ? 'pink' : ''} variant={isRecipient ? "solid" : "outline"} />
                    </Flex>
                    <Text fontSize="xs" color="gray.300">#{flow.id.toString()}</Text>
                </Flex>
                <Divider borderColor="gray.300" />
                <Flex direction="row" align="center" justify="space-between" gap={1}>
                    <Flex direction="row" align="center" gap={1}>
                        <Image src={token.logo} w={6} h={6} />
                        <Text fontSize="sm" fontWeight="semibold">{token.symbol}</Text>
                        <Text fontSize="sm" color="gray.300">
                            {`${formatUnits(amount, token.decimals)}`}
                        </Text>
                    </Flex>

                    <Flex direction="row" align="center" gap={1} color="gray.300">
                        <Box as={FaClock} size={12} />
                        <Text fontSize="sm">{timeLeft}</Text>
                    </Flex>
                </Flex>
                <Progress hasStripe colorScheme="pink" value={Number(progress)} rounded="md" />
            </Flex>
            <Flex direction="row" align="center" justify="space-between" color="gray.300" mt={3} gap={1}>
                <Flex direction="row" align="center" gap={1}>
                    <Box as={FaCoins} size={12} color="gray.300" />
                    <Text fontSize="sm">{formatUnits(flow.claimable, token.decimals)}</Text>
                </Flex>
                {
                    !isRecipient && (
                        <Button variant='link' colorScheme='pink' color="pink.400" size="xs">
                            Claim
                        </Button>
                    )
                }

            </Flex>
        </Card >
    )
}

export default FlowCard;