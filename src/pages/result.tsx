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

export async function getServerSideProps({ query }: { query: { session_id: string } }) {
    const data = await fetchGetJSON(`${process.env.HOST_URL}/api/checkout_sessions/${query.session_id}`)
    return { props: { data } }
}

export default function result({ data }: any) {

    const loading = useAppSelector((state) => state.loading.value)
    const authChecked = useAuth()

    useEffect(() => {
        if (!authChecked) return
    }, [authChecked])

    const router = useRouter()
    if (!data) return <div>failed to load</div>
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
