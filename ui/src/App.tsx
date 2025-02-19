import { useState } from 'react'
import './App.css'
import { Navbar } from './components/navbar'
import { RootGenerateToken } from './components/root-generate-token'
import { useObscuraStore } from './utils/obscura-store'

function App() {
    const obscura = useObscuraStore()

    obscura.checkToken()

    // const handleTokenChange = (e: any) => {
    //     setToken(e.target.value)
    // }

    if (obscura.rootTokenExists === false) {
        return RootGenerateToken()
    }

    return (
        <>
        <Navbar />
        </>
    )
}

export default App
