import { DefaultInput } from "@/components/ui/inputs/DefaultInput";
import styles from './ProfileEditForm.module.css'
import type { ProfileEditFormProps } from './ProfileEditForm'
import { EditBanner, EditAvatar, useImageSrc } from '@/components/layout/Partials/EditImage'

export function ProfileEditMain({ updatedUserRequest, setUpdatedUserRequest }: ProfileEditFormProps) {
    const { updatedUser } = updatedUserRequest
    const avatarSrc = useImageSrc(updatedUserRequest.avatarFile, updatedUser.avatar)
    const bannerSrc = useImageSrc(updatedUserRequest.bannerFile, updatedUser.banner)

    return (
        <div className = { styles.profileEditContainer }>
            <div className = { styles.profileEditText }>
                <div className={styles.inputWrapper}>
                    <DefaultInput 
                        label="Имя" 
                        value={updatedUser.name} 
                        setValue={(name: string) => setUpdatedUserRequest({ 
                            ...updatedUserRequest, 
                            updatedUser: { ...updatedUser, name },
                        })} 
                    />   
                </div>
                <div className={styles.inputWrapper}>  
                    <DefaultInput
                        label="Фамилия"
                        value={updatedUser.surname}
                        setValue={(surname: string) => setUpdatedUserRequest({ 
                            ...updatedUserRequest, 
                            updatedUser: { ...updatedUser, surname },
                        })}
                    />
                </div>
                <div className={styles.inputWrapper}>
                    <DefaultInput
                        label="Возраст"
                        value={updatedUser.age}
                        setValue={(age: number) => setUpdatedUserRequest({ 
                            ...updatedUserRequest, 
                            updatedUser: { ...updatedUser, age: Number(age) },
                        })}
                        type="number"
                    />
                </div>
                <div className={styles.inputWrapper}>
                    <DefaultInput
                        label="Город"
                        value={updatedUser.city}
                        setValue={(city: string) => setUpdatedUserRequest({ 
                            ...updatedUserRequest, 
                            updatedUser: { ...updatedUser, city },
                        })}
                    />
                </div>
                <div className={styles.textareaWrapper}>
                    <textarea
                        placeholder=" "
                        value={updatedUser.description}
                        onChange={(e) => setUpdatedUserRequest({ 
                            ...updatedUserRequest, 
                            updatedUser: { ...updatedUser, description: e.target.value },
                        })}
                        id="profile-description"
                    />
                    <label htmlFor="profile-description">О себе</label>
                </div>
            </div>
            <div className = { styles.profileEditImage }>
                <EditAvatar
                    imageSrc={avatarSrc}
                    rules="Аватар должен быть не боле 250*250px"
                    onChange={(image) => setUpdatedUserRequest({ ...updatedUserRequest, avatarFile: image })}
                />
                <EditBanner
                    imageSrc={bannerSrc}
                    rules="Баннер должен быть не боле 1920*1080px"
                    onChange={(image) => setUpdatedUserRequest({ ...updatedUserRequest, bannerFile: image })}
                />
            </div>
        </div>
    )
}
