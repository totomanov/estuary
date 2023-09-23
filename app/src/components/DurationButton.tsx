import React from 'react'
import { Box, Flex, Heading, Text, useRadio } from "@chakra-ui/react"

function DurationButton(props: any) {
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
                {...checkbox}
                cursor='pointer'
                borderWidth='1px'
                borderRadius='md'
                _checked={{
                    bg: 'pink.500',
                    color: 'white',
                    borderColor: 'pink.500',
                }}
                p={8}
            >
                <Heading size="md">{props.amount}</Heading>
                <Text fontSize="md">{props.unit}</Text>
                {/* {props.children} */}
            </Flex>
        </Box>
    )
}

export default DurationButton;