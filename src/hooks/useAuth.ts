import { loginAction, logoutAction } from '@/store/features/auth/authSlice'
import { setLoading } from '@/store/features/loading/loadingSlice'
import { useAppDispatch } from '@/store/hooks'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export default function useAuth() {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const [authChecked, setAuthChecked] = useState(false)
    const [routerPushed, setRouterPushed] = useState(false)

    function checkUrl(route: string, isAuthed: boolean) {
        if (route !== '/login' && route !== '/register') {
            if (isAuthed) {
                return dispatch(setLoading(false))
            } else {
                !routerPushed && router.push('/login')
                setRouterPushed(true)
                return dispatch(setLoading(false))
            }
        }
        if ((route === '/login' || route === '/register')) {
            if (isAuthed) {
                !routerPushed && router.push('/')
                setRouterPushed(true)
                return dispatch(setLoading(false))
            } else {
                return dispatch(setLoading(false))
            }
        }
    }

    useEffect(() => {
        dispatch(setLoading(true))
        fetch('/api/users/checkAuth', {
            method: 'post',
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                const isAuthed = data.user
                checkUrl(router.route, isAuthed)
                if (!isAuthed) return
                const { name, email } = data.user
                isAuthed && dispatch(loginAction({ name, email }))
            })
        // .then(async res => {
        //     const data = await res.json()
        //     console.log(data)
        //     if (router.route !== '/login' && router.route !== '/register') {
        //         if (data.message === 'no token') {
        //             if (!routerPushed) router.push('/login'); setRouterPushed(true)
        //             dispatch(setLoading(false))
        //         } else {
        //             dispatch(setLoading(false))
        //         }
        //     } else {
        //         if (data.message === 'no token') return dispatch(setLoading(false))
        //         dispatch(loginAction({ email: data.email, password: '' }))
        //         dispatch(setLoading(false))
        //         if (!routerPushed) router.push('/'); setRouterPushed(true)
        //     }
        // })
        // .catch(e => {
        //     console.log(e)
        //     console.log(router.route)
        //     if (router.route !== '/login' && router.route !== '/register') {
        //         if (!routerPushed) router.push('/login'); setRouterPushed(true)
        //         toast.error(`Please login to continue`, { toastId: 'error' })
        //         dispatch(logoutAction())
        //         dispatch(setLoading(false))
        //     } else {
        //         dispatch(logoutAction())
        //         dispatch(setLoading(false))
        //     }
        // })
        setAuthChecked(true)
    }, [])

    return authChecked
}
