import './App.css'
import { Navbar } from './components/navbar'
import { SomethingWentWrong } from './components/something-went-wrong'
import { RootGenerateToken } from './components/root-generate-token'
import { RootViewToken } from './components/root-view-token'
import { useAuthStore } from './utils/auth-store'


function App() {
    const {
        checkRootTokenExists,
        rootTokenExists,
        token,
        login,
        generateRootToken,
        ready,
        isAuthenticated,
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

    console.log('root app', rootTokenExists)

    if (rootTokenExists == true && !ready) {
        return RootViewToken(
            token,
            (token) => login(token),
        );
    }

    if (rootTokenExists == false && !ready) {
        return RootGenerateToken(
            generateRootToken
        );
    }

    return SomethingWentWrong()
}

export default App
