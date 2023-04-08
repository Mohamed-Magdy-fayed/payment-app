import { Typography } from '@material-tailwind/react'
import React from 'react'

const testCardNumber = [4242, 4242, 4242, 4242]

export default function StripeTestCards() {
    return (
        <pre className="flex flex-col justify-center items-center rounded-lg">
            <Typography variant='small'>Use any of the{' '}
                <a
                    href="https://stripe.com/docs/testing#cards"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Stripe test cards
                </a>{' '}
                for a dummy payment.</Typography>
            <div>
                <Typography className="flex gap-1">
                    <span>
                        e.g.{' '}
                    </span>
                    {testCardNumber.map((num, i) => (<span key={i}>{num}</span>))}</Typography>
            </div>
        </pre>
    )
}
