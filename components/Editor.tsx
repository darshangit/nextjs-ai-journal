'use client'

import { updateEntry } from '@/utils/api'
import { useState } from 'react'
import { useAutosave } from 'react-autosave'

export const Editor = ({ entry }) => {
    const [value, setValue] = useState(entry.content)
    const [isloading, setIsLoading] = useState(false)

    useAutosave({
        data: value,
        onSave: async (_value) => {
            setIsLoading(true)
            const updated = await updateEntry(entry.id, _value)
            setIsLoading(false)
        },
    })
    return (
        <div className="w-full h-full">
            {isloading && <div>...Loading</div>}
            <textarea
                className="w-full h-full p-8 text-xl outline-none"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    )
}
