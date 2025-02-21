import { useAuthStore } from "../utils/auth-store"


export const RootGenerateToken = () => {
    const {generateRootToken} = useAuthStore()

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-96">
                <h1 className="text-5xl font-bold text-center mb-4">Obscura</h1>
                <p className="border-[1px] py-4 rounded text-center mb-4 ">The ROOT token has not yet been created, it is required for the first access and you can generate new tokens from it</p>

                <button
                    className="w-full bg-red-400 text-gray-800 font-semibold px-4 py-2 rounded-md"
                     onClick={generateRootToken}
                >
                    Generate ROOT token
                </button>                
            </div>
        </div>
    )
}