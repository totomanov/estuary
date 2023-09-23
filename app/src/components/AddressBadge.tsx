import React from 'react'
import { Card, CardFooter, CardBody, Button, ButtonGroup, Flex, Image, Text, Progress, Badge, BadgeProps } from "@chakra-ui/react"

import wNEON from "../images/wNEON.svg"
import { getAddress } from 'viem';


type Props = BadgeProps & {
    label: string,
}

const formatLabel = (label: string) => {
    let address;
    try {
        address = getAddress(label);
    } catch (e: unknown) {
        return label;
    }

    return `${address.substring(0, 4)}...${address.substring(address.length - 4, address.length)}`
}

function AddressBadge({ label, ...badgeProps }: Props) {
    return (
        <Badge rounded="md" fontSize="xs" {...badgeProps} textTransform="none">{formatLabel(label)}</Badge>
    )
}

export default AddressBadge;