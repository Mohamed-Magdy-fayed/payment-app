import { NextApiRequest, NextApiResponse } from 'next'

import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2022-08-01',
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const id: string = req.query.id as string

    try {
        if (!id.startsWith('cs_')) {
            return res.status(401).json({ error: 'Incorrect CheckoutSession ID.' })
        }
        const checkoutSession: Stripe.Checkout.Session =
            await stripe.checkout.sessions.retrieve(id, {
                expand: ['payment_intent'],
            })

        res.status(200).json(checkoutSession)
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Internal server error'
        res.status(500).json({ error: errorMessage })
    }
}
