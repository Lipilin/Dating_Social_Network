import type { ReactNode } from 'react'
import { NoDataFound } from '@/components/pages/Errors/NoDataFound'
import { DefaultButton } from '@/components/ui/buttons/DefaultButton'
import styles from './ProfileSectionEmpty.module.css'

interface ProfileSectionEmptyProps {
    title: ReactNode
    buttonText?: string
    onAction?: () => void
    compact?: boolean
}

export function ProfileSectionEmpty({
    title,
    buttonText,
    onAction,
    compact = false,
}: ProfileSectionEmptyProps) {
    const ActionButton = buttonText && onAction
        ? () => (
            <DefaultButton
                onSend={async () => { onAction() }}
                content={buttonText}
                classNames="need-registration__button"
            />
        )
        : undefined

    return (
        <div className={`about__top ${styles.section}${compact ? ` ${styles.sectionCompact}` : ''}`}>
            <NoDataFound
                embedded
                compact={compact}
                title={title}
                Button={ActionButton}
            />
        </div>
    )
}
