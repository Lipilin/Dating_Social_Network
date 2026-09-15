import styles from './ProfileEditForm.module.css'
import type { UserUpdatedRequest } from '@/utils/api/types'
import { DefaultButton } from '@/components/ui/buttons/DefaultButton'
import { ProfileEditInterests } from './ProfileEditInterests'
import { useState,useContext } from 'react'
import { CategoryContext } from '@/utils/context/CategoryContext'
import { ProfileEditMain } from './ProfileEditMain'
import { ProfileToggler } from './ProfileToggler'
import { ProfileEditCountries } from './ProfileEditCountries'
import { Message } from '@/components/ui/messages/Message'

export interface ProfileEditFormProps{
    updatedUserRequest: UserUpdatedRequest
    setUpdatedUserRequest: (updatedUserRequest: UserUpdatedRequest) => void
    error?: string | null
    successMessage?: string | null
}

export type ActiveSection = 'main' | 'interests' | 'countries'

export function ProfileEditForm({ updatedUserRequest, setUpdatedUserRequest, onSend, error, successMessage }: ProfileEditFormProps & { 
    onSend: () => Promise<void>
}) {
    const { categories } = useContext(CategoryContext)
    const [activeSection, setActiveSection] = useState<ActiveSection>('main')
    return (
        <div className={styles.profileEditFormContainer}>
            <div className={styles.profileEditFormWrapper}>
                <div className={styles.profileEditFormHeader}>
                    <h2 className="section__title">Редактирование</h2>
                    <ProfileToggler activeSection={activeSection} setActiveSection={setActiveSection} />
                </div>
                { activeSection === 'main' && <ProfileEditMain updatedUserRequest={updatedUserRequest} setUpdatedUserRequest={setUpdatedUserRequest} /> }
                { 
                    activeSection === 'interests' &&
                    <ProfileEditInterests 
                        updatedUserRequest={updatedUserRequest} 
                        setUpdatedUserRequest={setUpdatedUserRequest} 
                        categories={categories} 
                    /> 
                }

                {
                    activeSection === 'countries' &&
                    (
                        <ProfileEditCountries
                            updatedUserRequest={updatedUserRequest}
                            setUpdatedUserRequest={setUpdatedUserRequest}
                            categories={categories}
                        />
                    )
                }

                <div className={styles.profileEditFormFooter}>
                    {(error || successMessage) && (
                        <Message
                            message={error ?? successMessage!}
                            type={error ? 'error' : 'success'}
                        />
                    )}
                    <DefaultButton
                        content="Сохранить"
                        onSend={async () => onSend()}
                        classNames="need-registration__button"
                    />
                </div>
            </div>
            
        </div>
    )
}