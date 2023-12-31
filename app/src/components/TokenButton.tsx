import React from 'react'
import { Box, Flex, Text, Image, useRadio } from "@chakra-ui/react"

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
                gap={1}
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
                <Image w={6} h={6} src={props.token.logo} borderRadius='full' />
                <Text fontSize="sm" fontWeight="semibold">{props.token.symbol}</Text>
            </Flex>
        </Box>
    )
}

export default TokenButton;