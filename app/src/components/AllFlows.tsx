import { Flex, SimpleGrid, Spinner } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useAccount } from 'wagmi';
import FlowCard from './FlowCard';
import { Flow } from './MyFlows';

type Props = {
    flows: Flow[]
}

function AllFlows({ flows }: Props) {
    const { address } = useAccount();

    const isSponsor = (flow: Flow) => !address ? false : flow.stream.sponsor.toLowerCase() === address.toLowerCase();
    const isRecipient = (flow: Flow) => !address ? false : flow.stream.recipient.toLowerCase() === address.toLowerCase();
    return (
        <SimpleGrid columns={2} spacing={10}>
            {
                flows
                    .sort((a, b) => {
                        if (isSponsor(a) && !isSponsor(b)) {
                            return -1;
                        } else if (!isSponsor(a) && isSponsor(b)) {
                            return 1;
                        }

                        if (isRecipient(a) && !isRecipient(b)) {
                            return -1;
                        } else if (!isRecipient(a) && isRecipient(b)) {
                            return 1;
                        }

                        return Number(a.id - b.id);
                    })
                    .map((flow) => (<FlowCard flow={flow} isRecipient={isRecipient(flow)} isSponsor={isSponsor(flow)} />))
            }
        </SimpleGrid>
    )

}
export default AllFlows;