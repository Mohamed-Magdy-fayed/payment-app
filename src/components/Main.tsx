import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useRouter } from "next/router"
import { ReactNode, useEffect } from "react"
import CheckoutForm from './CheckoutForm'

export default function Main({ children }: { children: ReactNode }) {
    const loading = useAppSelector((state) => state.loading.value)
    const dispatch = useAppDispatch()

    const router = useRouter()

    useEffect(() => {

    }, [])

    return (
        <div className="container flex flex-col items-center justify-center flex-grow">
            {children}
        </div>
    )
}
