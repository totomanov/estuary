import { HStack, useRadioGroup } from '@chakra-ui/react'
import React from 'react'
import DurationButton from './DurationButton'

function Duration() {
    const options = [
        {
            unit: 'days',
            value: 7,
            key: '7d',
        },
        {
            unit: 'days',
            value: 30,
            key: '30d',
        },
        {
            unit: 'days',
            value: 90,
            key: '90d',
        },
        {
            unit: 'days',
            value: 365,
            key: '365d',
        },
    ]

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'duration',
        defaultValue: `7d`,
        onChange: console.log,
    })

    const group = getRootProps()

    return (
        <HStack {...group}>
            {options.map(({ key, unit, value }) => {
                const radio = getRadioProps({ value: key })
                return (
                    <DurationButton key={key} unit={unit} value={value} {...radio} />
                )
            })}
        </HStack>
    )
}

export default Duration;