import { useConfigMapsDelete } from './config-maps-delete'
import { useObscuraStore } from "../utils/obscura-store"
import { useState, useEffect } from "react"
import Editor from '@monaco-editor/react'

export const ConfigMapsEdit = () => {
    const {
        saveConfigMap,
        setPathContent,
        navigateToConfigMaps,
        pathContent,
    } = useObscuraStore()

    const deleteConfigMap = useConfigMapsDelete()

    const [json, setJson] = useState('{}')

    const [error, setError] = useState('')

    useEffect(() => {
        setJson(JSON.stringify(pathContent, null, 2))
    }, [pathContent])

    const handleChange = (value: any) => {
        setJson(value || '')

        try {
            JSON.parse(value || '{}')
            setError('');
        } catch {
            setError('JSON inválido!')
        }
    }

    return (
        <>
            <div className="p-2 rounded-md h-[70vh]">
                <Editor
                    language="json"
                    value={json}
                    onChange={handleChange}
                    theme="vs-dark"
                    options={{
                        minimap: { enabled: false },
                        tabSize: 2,
                        autoIndent: 'full',
                    }}
                />
                {error && (
                    <div className="flex justify-start">
                        <p style={{ color: 'red' }}>{error}</p>
                    </div>
                )}
            </div>
            <div className="flex justify-end p-2 space-x-2">
                <button
                    className="btn btn-neutral"
                    onClick={navigateToConfigMaps}>Back</button>
                <button
                    className="btn btn-error"
                    onClick={deleteConfigMap}>Delete</button>
                { error === '' && json !== '{}' && json.length > 0 && (
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        setPathContent(JSON.parse(json))

                        saveConfigMap()
                    }
                }>Save ConfigMap</button>
            )}
            </div>
        </>
    )
}