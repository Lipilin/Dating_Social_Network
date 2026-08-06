import { useMemo } from 'react'
import type { UserResource } from '@/utils/api/types'
import { GENDER } from '@/utils/api/types'
import { ROUTES } from '@/config/General'
import { default as femaleAvatar } from '@/assets/images/avatar_female.png'
import { default as maleAvatar } from '@/assets/images/avatar_male.webp'
import styles from './UserInfoBlock.module.css'
import { Link } from 'react-router'

interface UserInfoBlockProps {
    user: UserResource
}

export function UserInfoBlock({ user }: UserInfoBlockProps) {
    const profileUrl = ROUTES.USER.URL.replace(':id', user.id)

    const avatarSrc = useMemo(() => {
        if (user.avatar) return user.avatar
        if (user.gender === GENDER.FEMALE) return femaleAvatar
        return maleAvatar
    }, [user])

    return (
        <aside className={styles.block}>
            <div className={styles.avatarWrapper}>
                <img className={styles.avatar} src={avatarSrc} alt="" />
            </div>

            <div className={styles.info}>
                <Link to={profileUrl} className={styles.name}>
                    {user.name} {user.surname}
                </Link>

                <p className={styles.meta}>{user.age} года</p>

                {user.city && <p className={styles.meta}>{user.city}</p>}

                {user.lastSeen && (
                    <p className={styles.lastSeen}>
                        Был(а) в сети:{' '}
                        <span>{new Date(user.lastSeen).toLocaleString('ru-RU')}</span>
                    </p>
                )}
            </div>

            <Link to={profileUrl} className={styles.profileLink}>
                Перейти в профиль
            </Link>
        </aside>
    )
}
