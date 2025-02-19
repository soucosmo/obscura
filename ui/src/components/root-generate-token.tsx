import { useObscuraStore } from "../utils/obscura-store"
import { useAuthStore } from "../utils/auth-store"

export const RootGenerateToken = () => {
    const auth = useAuthStore()
    const obscura = useObscuraStore()

    if (!auth.isAuthenticated && auth.rootTokenExists === undefined) {
        console.log("checkRootTokenExists")
        auth.checkRootTokenExists()
    }

    console.log('root exists', auth.rootTokenExists)

    console.log('token', auth.token)

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-96">
                <h1 className="text-5xl font-bold text-center mb-4">Obscura</h1>
                {auth.rootTokenExists == false && <p className="border-[1px] py-4 rounded text-center mb-4 ">The ROOT token has not yet been created, it is required for the first access and you can generate new tokens from it</p>}

                {auth.rootTokenExists == true && auth.token && <p className="border-[1px] py-4 rounded text-center mb-4 ">This is your ROOT token, keep it in a safe place, it is not recoverable if lost</p>}

                {auth.rootTokenExists && <input
                    type="text"
                    placeholder="Enter your token"
                    className="w-full px-4 py-2 rounded-md border border-gray-300 mb-4"
                    value={auth.token}
                    readOnly
                />}
                {auth.rootTokenExists == false && <button
                    className="w-full bg-red-400 text-gray-800 font-semibold px-4 py-2 rounded-md"
                     onClick={auth.generateRootToken}

                >
                    Generate ROOT token
                </button>
                }

                {auth.rootTokenExists == true && <button
                    className="w-full bg-blue-400 text-gray-800 font-semibold px-4 py-2 rounded-md"
                    onClick={() => alert('I already saved it!')}

                >
                    I already saved it!
                </button>
                }
            </div>
        </div>
    )
}