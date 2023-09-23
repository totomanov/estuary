import { HStack, useRadioGroup } from '@chakra-ui/react'
import React from 'react'
import DurationButton from './DurationButton'

type Props = {
    onSelected: (e: any) => void
}


function DurationPicker({ onSelected }: Props) {
    const oneDay = 86400;
    const options = [
        {
            unit: 'min',
            amount: '60',
            value: '3600',
        },
        {
            unit: 'hours',
            amount: '24',
            value: `${oneDay}`,
        },
        {
            unit: 'days',
            amount: '7',
            value: `${7 * oneDay}`,
        },
        {
            unit: 'days',
            amount: '30',
            value: `${30 * oneDay}`,
        },
    ]

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'duration',
        defaultValue: options[0].value,
        onChange: (e) => {
            console.log(e);
            return onSelected(e);
        }
    })

    const group = getRootProps()

    return (
        <HStack {...group}>
            {options.map(({ amount, unit, value }) => {
                const radio = getRadioProps({ value })
                return (
                    <DurationButton key={value} unit={unit} value={value} amount={amount} {...radio} />
                )
            })}
        </HStack>
    )
}

export default DurationPicker;