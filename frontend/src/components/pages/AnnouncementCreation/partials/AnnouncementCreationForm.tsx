import { useState } from 'react'
import { DefaultButton } from '@/components/ui/buttons/DefaultButton'
import type { AnnouncementCreateRequest, CategoryWithInterestResource } from '@/utils/api/types'
import { AnnouncementCreationToggler } from './AnnouncementCreationToggler'
import { AnnouncementCreationMain } from './AnnouncementCreationMain'
import { AnnouncementCreationInterests } from './AnnouncementCreationInterests'
import styles from '../AnnouncementCreation.module.css'
import { Message } from '@/components/ui/messages/Message'

export type ActiveSection = 'main' | 'interests'

interface AnnouncementCreationFormProps {
    announcement: AnnouncementCreateRequest
    onSend: () => Promise<void>
    setAnnouncement: (announcement: AnnouncementCreateRequest) => void
    categories: CategoryWithInterestResource[]
    error?: string | null
    successMessage?: string | null
    title?: string
    submitButtonText?: string
}

export function AnnouncementCreationForm({
    announcement,
    onSend,
    setAnnouncement,
    categories,
    error,
    successMessage,
    title = 'Создание Объявления',
    submitButtonText = 'Создать объявление',
}: AnnouncementCreationFormProps) {
    const [activeSection, setActiveSection] = useState<ActiveSection>('main')

    return (
        <div className={styles.announcementCreationFormContainer}>
            <div className={styles.announcementCreationFormWrapper}>
                <div className={styles.announcementCreationFormHeader}>
                    <h2 className="section__title">{title}</h2>
                    <AnnouncementCreationToggler
                        activeSection={activeSection}
                        setActiveSection={setActiveSection}
                    />
                </div>
                {activeSection === 'main' && (
                    <AnnouncementCreationMain
                        announcement={announcement}
                        setAnnouncement={setAnnouncement}
                    />
                )}
                {activeSection === 'interests' && (
                    <AnnouncementCreationInterests
                        announcement={announcement}
                        setAnnouncement={setAnnouncement}
                        categories={categories}
                    />
                )}
                <div className={styles.formActions}>
                    {(error || successMessage) && (
                        <div className={styles.feedbackMessage}>
                            <Message
                                message={error ?? successMessage!}
                                type={error ? 'error' : 'success'}
                            />
                        </div>
                    )}
                    <DefaultButton
                        onSend={onSend}
                        content={submitButtonText}
                        classNames="need-registration__button"
                    />
                </div>
            </div>
        </div>
    )
}
