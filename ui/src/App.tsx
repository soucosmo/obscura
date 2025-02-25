import './App.css'
import { useEffect } from 'react'
import { SomethingWentWrong } from './components/something-went-wrong'
import { RootGenerateToken } from './components/root-generate-token'
import { RootViewToken } from './components/root-view-token'
import { useObscuraStore } from './utils/obscura-store'
import { useAuthStore } from './utils/auth-store'
import { Login } from './components/login'
import { ConfigMaps } from './components/config-maps'


export default function() {
    const {
        checkRootTokenExists,
        level,
        isAuthenticated,
    } = useAuthStore()

    const { page } = useObscuraStore()

    useEffect(() => {
        checkRootTokenExists()
    }, [level])

    if (isAuthenticated) {
        return {
            ConfigMaps: <ConfigMaps/>,
            'error': <SomethingWentWrong/>
        }[page]
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
