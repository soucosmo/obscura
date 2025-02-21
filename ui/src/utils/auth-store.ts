import { toast } from 'react-toastify'
import { API_URL } from './config'
import { create } from 'zustand'

interface AuthState {
    level: number
    token: string
    rootTokenView: boolean
    isAuthenticated: boolean
    paths: string[]
    login: (token: string) => void
    logout: () => void
    generateRootToken: () => void
    checkRootTokenExists: () => void
}

export const useAuthStore = create<AuthState>((set, get) => {
    const token = localStorage.getItem('token') ?? ''

    return {
        level: 0,
        token,
        rootTokenView: false,
        isAuthenticated: !!token,
        paths: [],
        checkRootTokenExists: () => {
            if (get().level != 0) {
                return;
            }

            fetch(`${API_URL}/api/token/root-exists`)
                .then((res) => {
                    const rootTokenExists = res.status == 200

                    if (!rootTokenExists) {
                        set({level: 1})
                    } else if (rootTokenExists){
                        set({level: 3})
                    }
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
                        set({
                            level: 2,
                            token: data.text,
                            rootTokenView: true,
                        })
                    } else {
                        set({level: 3})
                    }
                })
        },
        login: async (token) => {
            fetch(`${API_URL}/api/token/${token}`).then(async (res) => {
                if (res.status == 200) {
                    localStorage.setItem('token', token)

                    let info = await res.json()

                    set({
                        token,
                        isAuthenticated: true,
                        rootTokenView: false,
                        paths: info.paths,
                        level: 10
                    })

                    toast.success('the token has been successfully verified!')
                } else {

                    set({
                        token,
                        isAuthenticated: false,
                        rootTokenView: false,
                        paths: [],
                        level: 10
                    })

                    toast.error(res.text())
                }
            })
        },
        logout: () => {
            set({
                isAuthenticated: false,
                rootTokenView: false,
                token: '',
                paths: [],
                level: 3,
            })

            localStorage.removeItem('token')

            toast.success('your token has been disconnected')
        },
    };
});
  