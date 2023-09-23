import React from 'react'
import { Card, CardFooter, CardBody, Button, ButtonGroup, Flex, Image, Text, Progress, Badge, BadgeProps } from "@chakra-ui/react"

import wNEON from "../images/wNEON.svg"


type Props = BadgeProps & {
    label: string,
}

function AddressBadge({ label, ...badgeProps }: Props) {
    return (
        <Badge rounded="md" {...badgeProps}>{label}</Badge>
    )
}

export default AddressBadge;