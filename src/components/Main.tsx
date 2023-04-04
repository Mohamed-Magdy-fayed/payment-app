import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { isLoading, notLoading, setLoading } from '../store/features/loading/loadingSlice'
import { useRouter } from "next/router"
import { useEffect } from "react"

export default function Main() {
    // The `state` arg is correctly typed as `RootState` already
    const loading = useAppSelector((state) => state.loading.value)
    const dispatch = useAppDispatch()

    const router = useRouter()

    useEffect(() => {
        
    }, [])

    return (
        <div className="container outline flex flex-col items-center justify-center flex-grow">
            {loading ? 'loading...' : 'done'}
            <button onClick={() => dispatch(isLoading())}>start loading</button>
            <button onClick={() => dispatch(notLoading())}>stop loading</button>
            <button onClick={() => dispatch(setLoading(!loading))}>set loading</button>
        </div>
    )
}
