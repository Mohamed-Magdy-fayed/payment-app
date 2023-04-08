import { loginAction, logoutAction } from '@/store/features/auth/authSlice'
import { setLoading } from '@/store/features/loading/loadingSlice'
import { useAppDispatch } from '@/store/hooks'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

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
        setAuthChecked(true)
    }, [])

    return authChecked
}
