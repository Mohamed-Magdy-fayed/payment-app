import CheckoutForm from "@/components/CheckoutForm";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import Main from "@/components/Main";
import ComplexNavbar from "@/components/Navbar";
import useAuth from "@/hooks/useAuth";
import clientPromise from "@/lib/mongodb";
import { useAppSelector } from "@/store/hooks";
import { Typography } from "@material-tailwind/react";
import { useEffect } from "react";

export async function getServerSideProps() {
  try {
    const client = await clientPromise
    const Users = client.db('payment-app').collection('users')
    const Auth = client.db('payment-app').collection('auth')
    Users.createIndex({ email: 1 }, { unique: true })
    Auth.createIndex({ userID: 1 }, { unique: true })
    Auth.createIndex({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 })

    return {
      props: { isConnected: true },
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false },
    }
  }
}

export default function Home() {
  const loading = useAppSelector((state) => state.loading.value)
  const authChecked = useAuth()

  useEffect(() => {
    if (!authChecked) return
  }, [authChecked])

  if (loading) return <Loading />

  return (
    <div className="min-h-screen flex flex-col items-center">
      <ComplexNavbar />
      <Main>
        <Typography variant='h2'>Donate with Stripe</Typography>
        <CheckoutForm />
      </Main>
      <Footer />
    </div>
  )
}
