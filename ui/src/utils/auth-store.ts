import { toast } from 'react-toastify'
import { API_URL } from "./config"
import { create } from "zustand"

interface AuthState {
  rootTokenExists?: boolean;
  token: string;
  isAuthenticated: boolean;
  ready: boolean;
  paths: string[];
  login: (token: string) => void;
  logout: () => void;
  generateRootToken: () => void;
  checkRootTokenExists: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
    const token = localStorage.getItem("token") ?? "";
  
    return {
        rootTokenExists: undefined,
        token,
        ready: false,
        isAuthenticated: !!token,
        paths: [],
        checkRootTokenExists: () => {
            console.log('faznd consulta')

            fetch(`${API_URL}/api/token/root-exists`)
                .then((res) => {
                    console.log('reees', res.status)
                    set({ rootTokenExists: res.status == 200 })
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
                            rootTokenExists: true,
                            token: data.text,
                        })
                    }
                })
        },
        login: async (token) => {
            fetch(`${API_URL}/api/token/${token}`).then(async (res) => {
                console.log('res', res)
                if (res.status == 200) {
                    localStorage.setItem("token", token);

                    let info = await res.json()

                    set({
                        token,
                        isAuthenticated: true,
                        ready: true,
                        paths: info.paths,
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
                ready: false,
                token: "",
                paths: [],
            })

            localStorage.removeItem("token")

            toast.success('your token has been disconnected')
        },
    };
  });
  