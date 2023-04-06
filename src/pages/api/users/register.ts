import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcryptjs'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise
    const Users = client.db('payment-app').collection('users')

    switch (req.method) {
        case 'POST':
            const { name, email, password } = req.body
            try {
                const exists = await Users.findOne({ email })
                if (exists) return res.status(401).json({ error: 'Email already in use!' })

                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(password, salt)

                const inserted = await Users.insertOne({
                    name,
                    email,
                    password: hashedPassword
                })
                res.status(201).json({ inserted })
            } catch (error) {
                res.status(400).json({ error: error })
            }
            return;
        default:
            return res.status(404).json({ erroe: 'not found' })
    }
}
