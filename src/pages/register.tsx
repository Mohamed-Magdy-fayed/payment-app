import useAuth from "@/hooks/useAuth";
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function register() {
    const authChecked = useAuth()
    const router = useRouter()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    function handleRegister(e: FormEvent) {
        e.preventDefault()
        setLoading(true)
        fetch('/api/users/register', {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        })
            .then(async res => {
                const data = await res.json()
                if (data.error) {
                    setLoading(false)
                    return toast.error(data.error, { toastId: 'data.error' })
                }
                toast.success(`Thanks for registering, Please login to continue`)
                router.push('/login')
            })
            .catch(e => {
                toast.error(e.message, { toastId: 'error' })
                setLoading(false)
            })
    }

    useEffect(() => {
        if (!authChecked) return
    }, [authChecked])

    return (
        <Card color="transparent" shadow={false} className="grid place-content-center h-screen">
            <Typography variant="h4" color="blue-gray">
                Sign Up
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                Enter your details to register.
            </Typography>
            <form onSubmit={handleRegister} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-4 flex flex-col gap-6">
                    <Input value={name} onChange={(e) => setName(e.target.value)} size="lg" label="Name" />
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} size="lg" label="Email" />
                    <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" size="lg" label="Password" />
                </div>
                <Checkbox
                    label={
                        (
                            <Typography
                                variant="small"
                                color="gray"
                                className="flex items-center font-normal"
                            >
                                I agree the
                                <a
                                    href="#"
                                    className="font-medium transition-colors hover:text-blue-500"
                                >
                                    &nbsp;Terms and Conditions
                                </a>
                            </Typography>
                        )
                    }
                    containerProps={{ className: "-ml-2.5" }}
                />
                <Button disabled={loading} type="submit" className="mt-6" fullWidth>
                    Register
                </Button>
                <Typography color="gray" className="mt-4 text-center font-normal">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-medium text-blue-500 transition-colors hover:text-blue-700"
                    >
                        Sign In
                    </Link>
                </Typography>
            </form>
        </Card>
    )
}
