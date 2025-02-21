import { useAuthStore } from "../utils/auth-store"

export const RootViewToken = () => {
    const {login, token} = useAuthStore()

    return (
        <div className="flex justify-center items-center min-h-[85vh]">
            <div className="w-96">
                <h1 className="text-5xl font-bold text-center mb-4">Obscura</h1>
                <p className="border-[1px] py-4 rounded text-center mb-4 ">This is your ROOT token, keep it in a safe place, it is not recoverable if lost</p>

                <input
                    type="text"
                    placeholder="Enter your token"
                    className="w-full px-4 py-2 rounded-md border border-gray-300 mb-4"
                    value={token}
                    readOnly
                />

                <button
                    className="w-full bg-blue-400 text-gray-800 font-semibold px-4 py-2 rounded-md"
                    onClick={() => login(token)}
                >
                    I already saved it!
                </button>
            </div>
        </div>
    )
}