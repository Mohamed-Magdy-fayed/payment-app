import clientPromise, { checkAuth } from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise
    const Users = client.db('payment-app').collection('users')
    const Auth = client.db('payment-app').collection('auth')

    switch (req.method) {
        case 'POST':
            const token = req.cookies.token
            if (!token) return res.status(200).json({ message: 'no token' })

            try {
                const isAuthed = await Auth.findOne({ token })
                if (!isAuthed) return res.status(403).json({ error: 'session expired, please login to continue' })

                const user = await checkAuth(token, Users)

                res
                    .status(200)
                    .json({ user })
            } catch (error: any) {
                res.status(400).json({ error: error.message })
            }
            return;
        default:
            return;
    }
}
