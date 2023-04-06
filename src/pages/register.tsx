import useAuth from "@/hooks/useAuth";
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import Link from "next/link";
import { useEffect } from "react";

export default function register() {
    const authChecked = useAuth()

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
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-4 flex flex-col gap-6">
                    <Input size="lg" label="Name" />
                    <Input size="lg" label="Email" />
                    <Input type="password" size="lg" label="Password" />
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
                <Button className="mt-6" fullWidth>
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
