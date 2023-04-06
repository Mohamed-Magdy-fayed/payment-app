import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import Main from "@/components/Main";
import ComplexNavbar from "@/components/Navbar";
import useAuth from "@/hooks/useAuth";
import clientPromise from "@/lib/mongodb";
import { useAppSelector } from "@/store/hooks";
import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

export async function getServerSideProps(context: any) {
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

export default function Home({ isConnected }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const loading = useAppSelector((state) => state.loading.value)
  const auth = useAppSelector((state) => state.auth.value)
  const router = useRouter()
  const authChecked = useAuth()

  useEffect(() => {
    if (!authChecked) return
  }, [authChecked])

  if (loading) return <Loading />

  return (
    <div className="min-h-screen flex flex-col items-center">
      <ComplexNavbar />
      <Main isConnected={isConnected} />
      <Footer />
    </div>
  )
}
