import { HStack, useRadioGroup } from '@chakra-ui/react'
import React from 'react'
import TokenButton from './TokenButton'

import wNEON from "../images/wNEON.svg"
import USDC from "../images/USDC.svg"
import USDT from "../images/USDT.svg"


function TokenPicker() {
    const options = [
        {
            symbol: 'wNEON',
            address: "0x202c35e517fa803b537565c40f0a6965d7204609",
            icon: wNEON,
        },
        {
            symbol: 'USDT',
            address: "0x5f0155d08eF4aaE2B500AefB64A3419dA8bB611a",
            icon: USDT,
        },
        {
            symbol: 'USDC',
            address: "0xEA6B04272f9f62F997F666F07D3a974134f7FFb9",
            icon: USDC,
        },
    ]

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'token',
        defaultValue: 'wNEON',
        onChange: console.log,
    })

    const group = getRootProps()

    return (
        <HStack {...group}>
            {options.map(({ symbol, address, icon }) => {
                const radio = getRadioProps({ value: symbol })
                return (
                    <TokenButton key={symbol} symbol={symbol} address={address} icon={icon} {...radio} />
                )
            })}
        </HStack>
    )
}

export default TokenPicker;