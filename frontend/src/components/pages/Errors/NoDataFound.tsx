import styles from './NoData.module.css'
import type { ComponentType, ReactNode } from 'react'

interface NoDataFoundProps {
    Button?: ComponentType<any>
    embedded?: boolean
    compact?: boolean
    title?: ReactNode
}

export function NoDataFound({ Button, embedded = false, compact = false, title }: NoDataFoundProps) {
    const cardClassName = [
        styles.card,
        embedded ? styles.cardEmbedded : '',
        compact ? styles.cardCompact : '',
    ].filter(Boolean).join(' ')

    const card = (
        <div className={cardClassName}>
            <div className={`${styles.icon}${compact ? ` ${styles.iconCompact}` : ''}`} aria-hidden="true">
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M8 6H18L22 10H26C27.1046 10 28 10.8954 28 12V26C28 27.1046 27.1046 28 26 28H6C4.89543 28 4 27.1046 4 26V8C4 6.89543 4.89543 6 6 6H8Z"
                        stroke="#0041F2"
                        strokeWidth="2"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M12 16H20"
                        stroke="#0041F2"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeDasharray="3 3"
                    />
                    <path
                        d="M12 21H17"
                        stroke="#0041F2"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeDasharray="3 3"
                    />
                </svg>
            </div>
            <h1 className={`${styles.title}${compact ? ` ${styles.titleCompact}` : ''}`}>
                {title ?? (
                    <>
                        Данные пока не выложены! <br />
                        Станьте первым!
                    </>
                )}
            </h1>
            {Button && (
                <div className={`${styles.actions}${compact ? ` ${styles.actionsCompact}` : ''}`}>
                    <Button />
                </div>
            )}
        </div>
    )

    if (embedded) {
        return card
    }

    return (
        <section className={styles.root}>
            <div className="container">
                {card}
            </div>
        </section>
    )
}
