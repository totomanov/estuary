import { Flex, Spinner } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useAccount } from 'wagmi';
import FlowCard from './FlowCard';

type Stream = {
    amount: bigint;
    start: bigint;
    end: bigint;
    lastClaim: bigint;
    recipient: string;
    sponsor: string;
    token: string;
}

export type Flow = {
    claimable: bigint;
    id: bigint;
    stream: Stream
}

type Props = {
    flows: Flow[]
}


function MyFlows({ flows }: Props) {
    const { address } = useAccount();

    const isSponsor = (flow: Flow) => !address ? false : flow.stream.sponsor.toLowerCase() === address.toLowerCase();
    const isRecipient = (flow: Flow) => !address ? false : flow.stream.recipient.toLowerCase() === address.toLowerCase();
    return (<Flex direction="row">
        {
            flows
                .filter((flow) => isSponsor(flow) || isRecipient(flow))
                .map((flow) => (<FlowCard flow={flow} isRecipient={isRecipient(flow)} isSponsor={isSponsor(flow)} />))
        }
    </Flex>)

}
export default MyFlows;