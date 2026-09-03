import styles from './EditImageBase.module.css'
import { useRef, useCallback } from 'react'
import type { EditImageBaseProps } from '../types'

export function EditImageBase({
    image,
    rules,
    onChange,
    className,
    placeholderClassName,
    alt,
}: EditImageBaseProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    const handleClick = useCallback(() => {
        inputRef.current?.click()
    }, [])

    const bodyClassName = className
        ? `${styles.editImageBase__body} ${className}`
        : styles.editImageBase__body

    const placeholderClassNames = placeholderClassName
        ? `${styles.editImageBase__placeholder} ${placeholderClassName}`
        : styles.editImageBase__placeholder

    return (
        <div className={styles.editImageBase}>
            <div className={bodyClassName}>
                <div className={placeholderClassNames}>
                    {image ? (
                        <img
                            src={URL.createObjectURL(image)}
                            alt={alt}
                            className={styles.editImageBase__placeholder__image}
                        />
                    ) : (
                        <div
                            className={styles.editImageBase__placeholder__icon}
                            onClick={handleClick}
                        >
                            <span className={styles.editImageBase__placeholder__plus} aria-hidden="true" />
                        </div>
                    )}
                </div>
                <p className={styles.editImageBase__rules}>{rules}</p>
            </div>
            <input
                type="file"
                className={styles.editImageBase__input}
                accept="image/*"
                onChange={(e) => onChange(e.target.files?.[0] ?? null)}
                ref={inputRef}
            />
        </div>
    )
}
