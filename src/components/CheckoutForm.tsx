import React, { ChangeEventHandler, FormEventHandler, useState } from 'react'
import CustomDonationInput from '../components/CustomDonationInput'
import StripeTestCards from '../components/StripeTestCards'
import getStripe from '../utils/getStripe'
import { fetchPostJSON } from '../utils/apiHelpers'
import { formatAmountForDisplay } from '../utils/stripeHelpers'
import * as config from '../config'
import { toast } from 'react-toastify'
import { Button, Card } from '@material-tailwind/react'

export default function CheckoutForm() {
    const [loading, setLoading] = useState(false)
    const [input, setInput] = useState({
        customDonation: Math.round(config.MAX_AMOUNT / config.AMOUNT_STEP),
    })

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) =>
        setInput({
            ...input,
            [e.currentTarget.name]: e.currentTarget.value,
        })

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        setLoading(true)
        // Create a Checkout Session.
        const response = await fetchPostJSON('/api/checkout_sessions', {
            amount: input.customDonation,
        })

        if (response.statusCode === 500) {
            console.error(response.message)
            return
        }

        // Redirect to Checkout.
        const stripe = await getStripe()
        const { error } = await stripe!.redirectToCheckout({
            // Make the id field from the Checkout Session creation API response
            // available to this file, so you can provide it as parameter here
            // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
            sessionId: response.id,
        })
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `error.message`.
        toast.error(error.message, { toastId: 'redirectToCheckoutfailed' })
        setLoading(false)
    }

    return (
        <Card className='p-4'>
            <form onSubmit={handleSubmit} className='flex flex-col items-center gap-4'>
                <CustomDonationInput
                    name={'customDonation'}
                    value={input.customDonation}
                    min={config.MIN_AMOUNT}
                    max={config.MAX_AMOUNT}
                    step={config.AMOUNT_STEP}
                    currency={config.CURRENCY}
                    onChange={handleInputChange}
                />
                <StripeTestCards />
                <Button
                    className=""
                    type="submit"
                    disabled={loading}
                >
                    Donate {formatAmountForDisplay(input.customDonation, config.CURRENCY)}
                </Button>
            </form>
        </Card>
    )
}
