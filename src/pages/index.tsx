import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import Main from "@/components/Main";
import ComplexNavbar from "@/components/Navbar";
import clientPromise from "@/lib/mongodb";
import { useAppSelector } from "@/store/hooks";
import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

export async function getServerSideProps(context: any) {
  try {
    await clientPromise
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

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

  useEffect(() => {
    console.log(loading)
    if (!auth.authed) router.push('/login')
  }, [auth.authed])

  if (loading) return <Loading />

  return (
    <div className="min-h-screen flex flex-col items-center">
      <ComplexNavbar />
      <Main isConnected={isConnected} />
      <Footer />
    </div>
  )
}
