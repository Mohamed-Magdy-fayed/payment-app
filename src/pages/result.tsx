import ComplexNavbar from '@/components/Navbar'
import PrintObject from '../components/PrintObject'
import { fetchGetJSON } from '@/utils/apiHelpers'
import Main from '@/components/Main'
import Footer from '@/components/Footer'
import { Button, Typography } from '@material-tailwind/react'
import { useRouter } from 'next/router'
import Loading from '@/components/Loading'
import { useEffect } from 'react'
import useAuth from '@/hooks/useAuth'
import { useAppSelector } from '@/store/hooks'
import useSWR from 'swr'

export default function result() {

    const router = useRouter()
    const { data, error } = useSWR(
        router.query.session_id
            ? `/api/checkout_sessions/${router.query.session_id}`
            : null,
        fetchGetJSON
    )

    const loading = useAppSelector((state) => state.loading.value)
    const authChecked = useAuth()

    useEffect(() => {
        if (!authChecked) return
    }, [authChecked])

    if (error) return <div>failed to load</div>
    if (!data) return <Loading />
    if (loading) return <Loading />

    return (
        <div className="min-h-screen flex flex-col items-center">
            <ComplexNavbar />
            <Main>
                <div className="!max-w-full p-4 flex flex-col gap-4">
                    <Typography variant='h3'>Checkout Payment Result</Typography>
                    <Typography variant='small'>Status: {data?.payment_intent?.status ?? 'loading...'}</Typography>
                    <PrintObject content={data || 'loading...'} />
                    <Button onClick={() => router.push('/')}>
                        Donate again
                    </Button>
                </div>
            </Main>
            <Footer />
        </div>

    )
}
