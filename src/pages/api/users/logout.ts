import clientPromise, { checkAuth } from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import jwt from 'jsonwebtoken'
import { ObjectId } from "mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const client = await clientPromise
    const Users = client.db('payment-app').collection('users')
    const Auth = client.db('payment-app').collection('auth')

    switch (req.method) {
        case 'POST':
            try {
                const token = req.cookies.token
                if (!token) return res.status(401).json({ error: 'login session already revoked!' })

                const user = await checkAuth(token, Users)

                const deleted = await Auth.findOneAndDelete({ token })
                if (!deleted.value) return res.status(401).json({ error: 'login session already revoked!' })

                res
                    .setHeader('Set-Cookie', serialize(
                        'token',
                        '',
                        {
                            expires: new Date(0),
                            httpOnly: true,
                            sameSite: 'strict',
                            secure: process.env.NODE_ENV !== 'development',
                            path: '/'
                        }
                    ))
                    .status(200)
                    .json({ loggedOutUser: user })
            } catch (error: any) {
                res.status(400).json({ error: error.message })
            }
            return;
        default:
            return;
    }
}
