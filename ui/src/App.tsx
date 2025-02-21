import './App.css'
import { Navbar } from './components/navbar'
import { useEffect } from 'react'
import { SomethingWentWrong } from './components/something-went-wrong'
import { RootGenerateToken } from './components/root-generate-token'
import { RootViewToken } from './components/root-view-token'
import { useAuthStore } from './utils/auth-store'
import { Login } from './components/login'


export default function() {
    const {
        checkRootTokenExists,
        level,
        isAuthenticated,
    } = useAuthStore()

    useEffect(() => {
        checkRootTokenExists()
    }, [level])

    if (isAuthenticated) {
        return (
            <>
            <Navbar />
            </>
        )
    }

    if (level == 1) {
        return <RootGenerateToken/>
    }

    if (level == 2) {
        return <RootViewToken/>
    }

    if (level == 3) {
        return <Login/>
    }

    return <SomethingWentWrong/>
}
