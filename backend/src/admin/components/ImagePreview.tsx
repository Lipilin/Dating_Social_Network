import { flat, type BasePropertyProps, type PropertyJSON } from 'adminjs'
import React from 'react'

type UploadPropertyCustom = PropertyJSON['custom'] & {
    keyProperty?: string
    filePathProperty?: string
    opts?: { baseUrl?: string }
}

function getImageSrc(record: BasePropertyProps['record'], property: BasePropertyProps['property']): string | null {
    const custom = property.custom as UploadPropertyCustom | undefined
    if (!custom?.keyProperty || !record) {
        return null
    }

    const key = flat.get(record.params, custom.keyProperty)
    if (!key || typeof key !== 'string') {
        return null
    }

    if (key.startsWith('/') || /^https?:\/\//.test(key)) {
        return key
    }

    if (custom.opts?.baseUrl) {
        return `${custom.opts.baseUrl}/${key}`
    }

    const filePath = flat.get(record.params, custom.filePathProperty ?? '')
    if (filePath && typeof filePath === 'string') {
        return filePath
    }

    return null
}

const ImagePreview: React.FC<BasePropertyProps> = ({ record, property, where }) => {
    const src = getImageSrc(record, property)
    if (!src) {
        return null
    }

    const maxSize = where === 'list' ? 72 : 240

    return (
        <div>
            <img
                src={src}
                alt=""
                style={{
                    display: 'block',
                    maxWidth: maxSize,
                    maxHeight: maxSize,
                    objectFit: 'contain',
                    borderRadius: 4,
                    border: '1px solid #e0e0e0'
                }}
            />
        </div>
    )
}

export default ImagePreview
