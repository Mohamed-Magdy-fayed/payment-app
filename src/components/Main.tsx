import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useRouter } from "next/router"
import { useEffect } from "react"

export default function Main({ isConnected }: { isConnected: boolean }) {
    const loading = useAppSelector((state) => state.loading.value)
    const dispatch = useAppDispatch()

    const router = useRouter()

    useEffect(() => {

    }, [])

    return (
        <div className="container outline flex flex-col items-center justify-center flex-grow">
            {isConnected ? (
                <h2 className="subtitle">You are connected to MongoDB</h2>
            ) : (
                <h2 className="subtitle">
                    You are NOT connected to MongoDB. Check the <code>README.md</code>{' '}
                    for instructions.
                </h2>
            )}
        </div>
    )
}
