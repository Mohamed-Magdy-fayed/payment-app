import Footer from '@/components/Footer'
import Main from '@/components/Main'
import ComplexNavbar from '@/components/Navbar'
import useAuth from '@/hooks/useAuth'
import { useAppSelector } from '@/store/hooks'
import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from '@material-tailwind/react'
import React from 'react'

export default function profile() {
    const user = useAppSelector(state => state.auth.value.userData)
    useAuth()

    return (
        <div className="min-h-screen flex flex-col items-center">
            <ComplexNavbar />
            <Main>
                <Card className='border border-light-blue-100'>
                    <CardHeader>
                        <Typography className='text-center bg-light-blue-100'>Profile</Typography>
                    </CardHeader>
                    <CardBody>
                        <div>
                            <Typography>User name: {user?.name}</Typography>
                            <Typography>User email: {user?.email}</Typography>
                        </div>
                    </CardBody>
                    <CardFooter className='flex gap-4'>
                        <Button>Go Home</Button>
                        <Button>Change password</Button>
                    </CardFooter>
                </Card>
            </Main>
            <Footer />
        </div>
    )
}
