import { formatAmountForDisplay } from '@/utils/stripeHelpers'
import { Typography } from '@material-tailwind/react'
import React from 'react'

type Props = {
    content: any
}

export default function PrintObject({ content }: Props) {
    return <pre>
        <Typography>Thanks for donating {formatAmountForDisplay(content.amount_subtotal, content.currency)}</Typography>
    </pre>
}
