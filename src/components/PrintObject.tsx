import { formatAmountForDisplay, formatAmountFromStripe } from '@/utils/stripeHelpers'
import { Typography } from '@material-tailwind/react'
import React from 'react'

type Props = {
    content: any
}

export default function PrintObject({ content }: Props) {
    const amount = formatAmountForDisplay(formatAmountFromStripe(content.amount_subtotal, content.currency), content.currency)
    return <pre>
        <Typography>Thanks for donating {amount}</Typography>
    </pre>
}
