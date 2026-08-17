import styles from './ProfileEditForm.module.css'
import type { UserResource } from '@/utils/api/types'
import { DefaultInput } from '@/components/ui/inputs/DefaultInput'
import { DefaultButton } from '@/components/ui/buttons/DefaultButton'
import { ProfileEditInterests } from './ProfileEditInterests'
import { ProfileEditCountries } from './ProfileEditCountries'
import { useContext } from 'react'
import { CategoryContext } from '@/utils/context/CategoryContext'

interface ProfileEditFormProps{
    profile: UserResource
    setUpdatedUser: (user: UserResource) => void
}

export function ProfileEditForm({ profile, setUpdatedUser }: ProfileEditFormProps) {
    const { categories } = useContext(CategoryContext)
    return (
        <div className={styles.profileEditFormContainer}>
            <div className={styles.profileEditFormWrapper}>
                <div className={styles.profileEditFormHeader}>
                    <h2 className="section__title">Редактирование</h2>
                </div>
                <div>
                    <h3 className="section__title">Основное</h3>
                </div>
                <div className={styles.profileEditFormContent}>
                    <div className={styles.inputWrapper}>
                        <DefaultInput 
                            label="Имя" 
                            value={profile.name} 
                            setValue={(name: string) => setUpdatedUser({ ...profile, name })} 
                        />   
                    </div>
                    <div className={styles.inputWrapper}>  
                        <DefaultInput
                            label="Фамилия"
                            value={profile.surname}
                            setValue={(surname: string) => setUpdatedUser({ ...profile, surname })}
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <DefaultInput
                            label="Возраст"
                            value={profile.age}
                            setValue={(age: number) => setUpdatedUser({ ...profile, age })}
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <DefaultInput
                            label="Город"
                            value={profile.city}
                            setValue={(city: string) => setUpdatedUser({ ...profile, city })}
                        />
                    </div>
                </div>
                <div className={styles.textareaWrapper}>
                    <textarea
                        placeholder=" "
                        value={profile.description}
                        onChange={(e) => setUpdatedUser({ ...profile, description: e.target.value })}
                        id="profile-description"
                    />
                    <label htmlFor="profile-description">О себе</label>
                </div>
                <div>
                    <h3 className="section__title">Мои интересы</h3>
                </div>
                <ProfileEditInterests
                    profile={profile}
                    setUpdatedUser={setUpdatedUser}
                    categories={categories}
                />
                <div>
                    <ProfileEditCountries
                        profile={profile}
                        setUpdatedUser={setUpdatedUser}
                    />
                </div>
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