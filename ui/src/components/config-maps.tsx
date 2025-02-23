import { useObscuraStore } from "../utils/obscura-store"
import { ConfigMapsEdit } from "./config-maps-edit"
import { useDebounce } from "./debounce"
import { Layout } from "../layout"
import { useEffect } from "react"

export const ConfigMaps = () => {
    const {
        pathWithPrefix,
        setPathContent,
        getPathsWithPrefix,
        currentPath,
        setCurrentPath,
        pathContent,
        pathEditing,
        setPathEditing,
        getPath,
    } = useObscuraStore()

    const debouncedPath = useDebounce(currentPath, 500)

    useEffect(() => {
        if (debouncedPath.length === 0) {
            getPathsWithPrefix('*');
        } else {
            getPathsWithPrefix(getPath());
        }
    }, [debouncedPath])

    const pathsPrefix = Object.entries(pathWithPrefix)

    return (
        <Layout>
            <div className=" m-2">
                <input
                    className="input input-bordered w-full"
                    placeholder="Enter your path"
                    value={currentPath}
                    onChange={e => {
                        setCurrentPath(e.target.value)
                    }}
                />
            </div>
            {currentPath.length > 0 && (
                <ConfigMapsEdit/>
            )}
            {pathsPrefix.length > 0 && pathContent && pathEditing === false && (
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Path</th>
                        </tr>
                    </thead>
                    <tbody>
                        { pathsPrefix.map(i => {
                            const path = i[0]
                            const { content } = i[1]

                            return (
                                <tr className="cursor-pointer" key={path} onClick={() => {
                                    setCurrentPath(path)
                                    setPathEditing(true)
                                    setPathContent(content)
                                }}>
                                    <td>{i[0]}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )}
        </Layout>
    )
}