import { toast } from 'react-toastify'
import { API_URL } from "./config"
import { create } from "zustand"

interface AuthState {
    rootTokenCreating: boolean
    rootTokenExists?: boolean
    token: string
    isAuthenticated: boolean
    paths: string[]
    login: (token: string) => void
    logout: () => void
    generateRootToken: () => void
    checkRootTokenExists: () => void
}

export const useAuthStore = create<AuthState>((set) => {
    const token = localStorage.getItem("token") ?? ""
    const rootTokenCreating = localStorage.getItem('rootTokenCreating') == 'true'

    return {
        rootTokenCreating,
        rootTokenExists: undefined,
        token,
        isAuthenticated: !!token,
        paths: [],
        checkRootTokenExists: () => {
            fetch(`${API_URL}/api/token/root-exists`)
                .then((res) => {
                    const rootTokenExists = res.status == 200

                    let rootTokenCreating = true

                    if (!rootTokenExists && !localStorage.getItem('rootTokenCreating')) {
                        localStorage.setItem("rootTokenCreating", "true")
                    }

                    set({
                        rootTokenExists,
                        rootTokenCreating,
                    })
                })
        },
        generateRootToken: () => {
            fetch(`${API_URL}/api/token/root-generate`, {
                method: 'post',
            })
                .then(async (res) => {
                    return {
                        status: res.status,
                        text: await res.text()
                    }
                }).then((data) => {
                    console.log(data)
                    if (data.status === 201) {
                        localStorage.setItem("rootTokenCreating", "true")

                        set({
                            rootTokenExists: true,
                            token: data.text,
                        })
                    }
                })
        },
        login: async (token) => {
            fetch(`${API_URL}/api/token/${token}`).then(async (res) => {
                if (res.status == 200) {
                    localStorage.setItem("token", token)

                    localStorage.setItem("rootTokenCreating", "false")

                    let info = await res.json()

                    set({
                        token,
                        isAuthenticated: true,
                        paths: info.paths,
                        rootTokenCreating: false,
                    })

                    toast.success('the token has been successfully verified!')
                } else {
                    toast.error(res.text())
                }
            })
        },
        logout: () => {
            set({
                isAuthenticated: false,
                token: "",
                paths: [],
                rootTokenCreating: false,
            })

            localStorage.removeItem("token")

            toast.success('your token has been disconnected')
        },
    };
  });
  