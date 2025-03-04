import { toast } from "react-toastify"
import { API_URL } from "./config"
import { create } from "zustand"

interface ObscuraState {
    page: string,
    setPage: (page: string) => void
    pathWithPrefix: object
    setPathWithPrefix: (pathWithPrefix: any) => void
    currentPath: string
    setCurrentPath: (currentPath: string) => void
    getPathsWithPrefix: (path: string) => void
    pathContent: object
    setPathContent: (pathContent: object) => void
    saveConfigMap: () => void
    deleteConfigMap: () => void
    pathEditing: boolean
    setPathEditing: (pathEditing: boolean) => void
    navigateToConfigMaps: () => void
    getPath: () => string
}

export const useObscuraStore = create<ObscuraState>((set, get) => {
    return {
        page: 'ConfigMaps',
        pathWithPrefix: {},
        currentPath: '',
        pathContent: {},
        pathEditing: false,
        setPathEditing: (pathEditing: boolean) => {
            set({ pathEditing })
        },
        setPage: (page: string) => {
            set({ page })
        },
        setPathWithPrefix: (pathWithPrefix) => {
            set({ pathWithPrefix })
        },
        setCurrentPath: (currentPath: string) => {
            set({ currentPath })
        },
        getPathsWithPrefix: (path: string) => {
            fetch(`${API_URL}/api/config-map/${path}/prefix`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(async (res) => {
                if (res.status == 200) {
                    let paths = await res.json()

                    set({ pathWithPrefix: paths })
                } else {
                    toast.error(await res.text())
                }
            })
        },
        setPathContent: (pathContent: object) => {
            set({ pathContent })
        },
        getPath() {
            let path = get().currentPath

            path = path.replace('//', '/')

            if (path.startsWith('/')) {
                path = path.substring(1, path.length)
            }

            return path
        },
        saveConfigMap: () => {
            let path = get().getPath()

            fetch(`${API_URL}/api/config-map/${path}`, {
                method: 'put',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(get().pathContent)
            }).then(async (res) => {
                if (res.status == 200) {
                    toast.success('The config map has been successfully saved!')
                } else {
                    toast.error(await res.text())
                }
            })
        },
        deleteConfigMap: () => {
            const path = get().currentPath.substring(1, get().currentPath.length)

            fetch(`${API_URL}/api/config-map/${path}`, {
                method: 'delete',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }).then(async (res) => {
                if (res.status == 200) {
                    toast.success('The config map has been successfully deleted!')

                    get().navigateToConfigMaps()
                } else {
                    toast.error(await res.text())
                }
            })
        },
        navigateToConfigMaps: () => {
            set({
                page: 'ConfigMaps',
                pathContent: {},
                pathEditing: false,
                currentPath: '',
            })
        }
    }
});
