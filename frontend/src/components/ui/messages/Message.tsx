import styles from './Message.module.css'

interface MessageProps {
    message: string
    type: 'success' | 'error'
}

export function Message({ message, type }: MessageProps) {
    return (
        <div className={`${styles.message} ${styles[type]}`}>
            {message}
        </div>
    )
}
