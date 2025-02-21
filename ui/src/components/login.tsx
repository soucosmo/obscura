import { useState } from 'react'
import { useAuthStore } from '../utils/auth-store'

export const Login = () => {
    const [inputToken, setInputToken] = useState<string>("")

    const {login} = useAuthStore()

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-96">
                <h1 className="text-5xl font-bold text-center mb-4">Obscura</h1>
                <p className="text-center mb-4">Enter your token below to connect</p>

                <input
                    type="text"
                    placeholder="Enter your token"
                    className="w-full px-4 py-2 rounded-md border border-gray-300 mb-4"
                    onChange={e => setInputToken(e.target.value)}
                />

                <button
                    className="w-full bg-green-400 text-gray-800 font-semibold px-4 py-2 rounded-md"
                    onClick={() => login(inputToken)}
                >
                    Connect
                </button>
            </div>
        </div>
    )
}