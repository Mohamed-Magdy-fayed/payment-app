import ComplexNavbar from '@/components/Navbar'
import Layout from '../components/Layout'
import PrintObject from '../components/PrintObject'
import { fetchGetJSON } from '@/utils/apiHelpers'
import Main from '@/components/Main'
import Footer from '@/components/Footer'
import { Button, Typography } from '@material-tailwind/react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export async function getServerSideProps({ query }: { query: { session_id: string } }) {
    const data = await fetchGetJSON(
        query.session_id
            ? `http://localhost:3001/api/checkout_sessions/${query.session_id}`
            : '')
    return { props: { data } }
}

export default function result({ data }: any) {

    const router = useRouter()
    if (!data) return <div>failed to load</div>

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
