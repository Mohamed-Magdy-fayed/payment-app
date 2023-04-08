import { formatAmountForDisplay } from '@/utils/stripeHelpers'
import { Input } from '@material-tailwind/react'
import React from 'react'

type Props = {
    name: string
    value: number
    min: number
    max: number
    currency: string
    step: number
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function CustomDonationInput({
    name,
    value,
    min,
    max,
    currency,
    step,
    onChange,
}: Props) {
    return (
        <div className='flex flex-col gap-2 items-center justify-center'>
            Custom donation amount ({formatAmountForDisplay(min, currency)}-
            {formatAmountForDisplay(max, currency)}):
            <Input
                label='Donation Amount'
                placeholder={value.toString()}
                type="number"
                name={name}
                value={value}
                min={min}
                max={max}
                step={step}
                onChange={onChange}
            ></Input>
            <input
                className='w-full'
                type="range"
                name={name}
                value={value}
                min={min}
                max={max}
                step={step}
                onChange={onChange}
            ></input>
        </div>
    )
}
