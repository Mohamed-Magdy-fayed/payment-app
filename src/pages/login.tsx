import { loginAction } from "../store/features/auth/authSlice";
import { notLoading } from "../store/features/loading/loadingSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

export default function login() {

    const auth = useAppSelector((state) => state.auth.value)
    const dispatch = useAppDispatch()
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        if (auth.authed) router.push('/')
    }, [auth.authed])

    function handleLogin(e: FormEvent) {
        e.preventDefault()
        dispatch(loginAction({ email, password }))
        dispatch(notLoading())
    }

    return (
        <Card color="transparent" shadow={false} className="grid place-content-center h-screen">
            <Typography variant="h4" color="blue-gray">
                Log In
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                Enter your email and password.
            </Typography>
            <form onSubmit={handleLogin} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-4 flex flex-col gap-6">
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="none" size="lg" label="Email" />
                    <Input value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="none" type="password" size="lg" label="Password" />
                </div>
                <Button type="submit" className="mt-6" fullWidth>
                    Log In
                </Button>
                <Typography color="gray" className="mt-4 text-center font-normal">
                    Need an account?{" "}
                    <Link
                        href="/register"
                        className="font-medium text-blue-500 transition-colors hover:text-blue-700"
                    >
                        Sign Up
                    </Link>
                </Typography>
            </form>
        </Card>
    )
}
