import { DefaultInput } from "@/components/ui/inputs/DefaultInput";
import styles from './ProfileEditForm.module.css'
import type { ProfileEditFormProps } from './ProfileEditForm'
import { EditBanner, EditAvatar } from '@/components/layout/Partials/EditImage'

export function ProfileEditMain({ profile, setUpdatedUser }: ProfileEditFormProps) {
    return (
        <div className = { styles.profileEditContainer }>
            <div className = { styles.profileEditText }>
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
                        setValue={(age: number) => setUpdatedUser({ ...profile, age: Number(age) })}
                        type="number"
                    />
                </div>
                <div className={styles.inputWrapper}>
                    <DefaultInput
                        label="Город"
                        value={profile.city}
                        setValue={(city: string) => setUpdatedUser({ ...profile, city })}
                    />
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
            </div>
            <div className = { styles.profileEditImage }>
                <EditAvatar 
                    image={profile.avatar} 
                    rules="Размер изображения должен быть не более 1024x1024 пикселей" 
                    onChange={(image) => setUpdatedUser({ ...profile, avatar: image })} 
                />
                <EditBanner 
                    image={profile.banner} 
                    rules="Размер изображения должен быть не более 1024x1024 пикселей" 
                    onChange={(image) => setUpdatedUser({ ...profile, banner: image })} 
                />
            </div>
        </div>
    )
}