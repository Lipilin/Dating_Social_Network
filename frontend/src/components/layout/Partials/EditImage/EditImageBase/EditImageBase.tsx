import styles from './EditImageBase.module.css'
import { useRef, useCallback, useEffect, useState } from 'react'
import type { EditImageBaseProps } from '../types'

export function EditImageBase({
    image,
    rules,
    onChange,
    className,
    placeholderClassName,
    alt,
    currentImage,
}: EditImageBaseProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    const handleClick = useCallback(() => {
        inputRef.current?.click()
    }, [])
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    useEffect(() => {
        if(image) setImageUrl(URL.createObjectURL(image))
        else if(currentImage) setImageUrl(currentImage)
        else setImageUrl(null)
        return () => { imageUrl && URL.revokeObjectURL(imageUrl) }
    }, [image, currentImage])

    const bodyClassName = className
        ? `${styles.editImageBase__body} ${className}`
        : styles.editImageBase__body

    const placeholderClassNames = placeholderClassName
        ? `${styles.editImageBase__placeholder} ${placeholderClassName}`
        : styles.editImageBase__placeholder

    return (
        <div className={styles.editImageBase}>
            <div className={bodyClassName}>
                <div className={placeholderClassNames} onClick={handleClick}>
                    <div className={styles.editImageBase__placeholder__icon}>
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt={alt}
                                className={styles.editImageBase__placeholder__image}
                            />
                        ) : (
                             <span className={styles.editImageBase__placeholder__plus} aria-hidden="true" />
                        )}
                    </div>
                </div>
                <p className={styles.editImageBase__rules}>{rules}</p>
            </div>
            <input
                type="file"
                className={styles.editImageBase__input}
                accept="image/*"
                onChange={(e) => {
                    if(!e.target.files?.[0]) return
                    onChange(e.target.files[0])
                }}
                ref={inputRef}
            />
        </div>
    )
}
