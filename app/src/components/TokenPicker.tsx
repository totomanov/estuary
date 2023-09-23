import { HStack, useRadioGroup } from '@chakra-ui/react'
import React from 'react'
import TokenButton from './TokenButton'
import { tokens } from '../tokens'


function TokenPicker() {
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'token',
        defaultValue: 'wNEON',
        onChange: console.log,
    })

    const group = getRootProps()

    return (
        <HStack {...group}>
            {tokens.map((token) => {
                const radio = getRadioProps({ value: token.symbol })
                return (
                    <TokenButton key={token.symbol} token={token} {...radio} />
                )
            })}
        </HStack>
    )
}

export default TokenPicker;