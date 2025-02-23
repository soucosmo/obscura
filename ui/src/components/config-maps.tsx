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

    const debouncedPath = useDebounce(currentPath, 400)

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
                <div className=" mx-auto my-8 rounded-lg shadow-md overflow-hidden">
                    <div className="max-h-[50vh] overflow-y-auto">
                        <table className="table w-full table-fixed">
                            <thead className="sticky top-0 bg-base-100">
                                <tr>
                                    <th className="p-3 text-lg">Path</th>
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
                                            <td className="p-3">{path}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </Layout>
    )
}