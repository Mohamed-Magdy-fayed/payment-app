import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { serialize } from "cookie";
import { ObjectId } from "mongodb";

// Generate JWT
const generateToken = (id: ObjectId) => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, {
        expiresIn: '1d',
    })
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const client = await clientPromise
    const Users = client.db('payment-app').collection('users')
    const Auth = client.db('payment-app').collection('auth')

    switch (req.method) {
        case 'POST':
            try {
                const { email, password } = req.body

                // Check for user email
                const user = await Users.findOne({ email })
                if (!user) return res.status(401).json({ error: 'invalid email!' })
                if (!await bcrypt.compare(password, user.password)) return res.status(401).json({ error: 'incorrect Password' })

                const session = await Auth.findOne({ "userID": user._id }, { projection: { password: 0 } })
                if (session) return res.status(401).json({ error: 'user already logged in!' })

                const token = generateToken(user._id)
                await Auth.insertOne({ token, userID: user._id, createdAt: new Date() })

                res
                    .setHeader('Set-Cookie', serialize(
                        'token',
                        token,
                        {
                            maxAge: 60 * 60 * 24,
                            httpOnly: true,
                            sameSite: 'strict',
                            secure: process.env.NODE_ENV !== 'development',
                            path: '/'
                        }
                    ))
                    .status(200)
                    .json({ user })
            } catch (error) {
                res.status(400).json({ error: error })
            }
            return;
        default:
            return;
    }
}
