'use client'

import { useState } from 'react'
import { useAutosave } from 'react-autosave'

export const Editor = ({ entry }) => {
    const [value, setValue] = useState(entry.content)
    useAutosave({
        data: value,
        onSave: async(_value) => {
            
        }
    })
    return (
        <div className="w-full h-full">
            <textarea
                className="w-full h-full p-8 text-xl outline-none"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    )
}
