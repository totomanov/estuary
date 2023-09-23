import React from 'react'
import { Box, Flex, Heading, Text, Image, useRadio } from "@chakra-ui/react"
import wNEON from "../images/wNEON.svg"
import USDC from "../images/USDC.svg"
import USDT from "../images/USDT.svg"

function TokenButton(props: any) {
    const { getInputProps, getRadioProps } = useRadio(props)

    const input = getInputProps()
    const checkbox = getRadioProps()

    return (
        <Box as='label'>
            <input {...input} />
            <Flex
                direction="column"
                align="center"
                justify="center"
                w={16}
                h={16}
                cursor='pointer'
                borderWidth='1px'
                borderRadius='md'
                _checked={{
                    bg: 'pink.500',
                    color: 'white',
                    borderColor: 'pink.500',
                }}
                p={2}
                {...checkbox}
            >
                <Image w={8} h={8} src={props.icon} borderRadius='full' />
                <Text fontSize="sm">{props.symbol}</Text>
            </Flex>
        </Box>
    )
}

export default TokenButton;