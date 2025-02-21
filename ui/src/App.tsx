import './App.css'
import { Navbar } from './components/navbar'
import { SomethingWentWrong } from './components/something-went-wrong'
import { RootGenerateToken } from './components/root-generate-token'
import { RootViewToken } from './components/root-view-token'
import { useAuthStore } from './utils/auth-store'
import { Login } from './components/login'


export default function() {
    const {
        checkRootTokenExists,
        rootTokenExists,
        isAuthenticated,
        rootTokenCreating,
    } = useAuthStore()

    if (isAuthenticated) {
        return (
            <>
            <Navbar />
            </>
        )
    }

    if (rootTokenExists === undefined) {
        checkRootTokenExists()
    }

    if (rootTokenExists == false) {
        return <RootGenerateToken/>
    }

    if (rootTokenExists == true && rootTokenCreating) {
        return <RootViewToken/>
    }   

    if (!rootTokenCreating) {
        return <Login/>
    }

    return <SomethingWentWrong/>
}
