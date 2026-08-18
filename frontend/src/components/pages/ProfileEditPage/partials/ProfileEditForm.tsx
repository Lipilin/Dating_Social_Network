import styles from './ProfileEditForm.module.css'
import type { UserResource } from '@/utils/api/types'
import { DefaultButton } from '@/components/ui/buttons/DefaultButton'
import { ProfileEditInterests } from './ProfileEditInterests'
import { useState,useContext } from 'react'
import { CategoryContext } from '@/utils/context/CategoryContext'
import { ProfileEditMain } from './ProfileEditMain'
import { ProfileToggler } from './ProfileToggler'
import { ProfileEditCountries } from './ProfileEditCountries'

export interface ProfileEditFormProps{
    profile: UserResource
    setUpdatedUser: (user: UserResource) => void
}

export type ActiveSection = 'main' | 'interests' | 'countries'

export function ProfileEditForm({ profile, setUpdatedUser }: ProfileEditFormProps) {
    const { categories } = useContext(CategoryContext)
    const [activeSection, setActiveSection] = useState<ActiveSection>('main')
    return (
        <div className={styles.profileEditFormContainer}>
            <div className={styles.profileEditFormWrapper}>
                <div className={styles.profileEditFormHeader}>
                    <h2 className="section__title">Редактирование</h2>
                    <ProfileToggler activeSection={activeSection} setActiveSection={setActiveSection} />
                </div>
                { activeSection === 'main' && <ProfileEditMain profile={profile} setUpdatedUser={setUpdatedUser} /> }
                { 
                    activeSection === 'interests' &&
                    <ProfileEditInterests 
                        profile={profile} 
                        setUpdatedUser={setUpdatedUser} 
                        categories={categories} 
                    /> 
                }

                {
                    activeSection === 'countries' &&
                    (
                        <ProfileEditCountries
                            profile={profile}
                            setUpdatedUser={setUpdatedUser}
                            categories={categories}
                        />
                    )
                }

                <div className={styles.profileEditFormFooter}>
                    <DefaultButton
                        content="Сохранить"
                        onSend={async () => {}}
                        classNames="need-registration__button"
                    />
                </div>
            </div>
            
        </div>
    )
}