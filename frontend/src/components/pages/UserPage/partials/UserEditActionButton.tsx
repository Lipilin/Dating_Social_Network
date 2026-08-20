import type { ReactNode } from 'react'
import { Link } from 'react-router'
import styles from './UserEditActions.module.css'

interface UserEditActionButtonProps {
    children: ReactNode
    to?: string
    onClick?: () => void
    ariaLabel?: string
    iconOnly?: boolean
}

export function UserEditActionButton({
    children,
    to,
    onClick,
    ariaLabel,
    iconOnly = false,
}: UserEditActionButtonProps) {
    const className = iconOnly ? `write ${styles.iconAction}` : 'write'

    if (to) {
        return (
            <Link to={to} className={className} aria-label={ariaLabel}>
                {children}
            </Link>
        )
    }

    return (
        <button
            type="button"
            className={`${className} ${styles.actionButton}`}
            onClick={onClick}
            aria-label={ariaLabel}
        >
            {children}
        </button>
    )
}
