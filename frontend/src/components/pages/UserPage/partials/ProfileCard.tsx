import type { UserResource } from '@/utils/api/types'
import type { ComponentType } from 'react'
import { useMemo } from 'react'
import { default as femaleAvatar } from '@/assets/images/avatar_female.png'
import { default as maleAvatar } from '@/assets/images/avatar_male.webp'
import { GENDER } from '@/utils/api/types'
import { formatLastSeen } from '../utils/formatLastSeen'

interface ProfileCardProps {
    profile: UserResource
    UserActions: ComponentType
}

export function ProfileCard({ profile, UserActions }: ProfileCardProps) {
    const userAvatar = useMemo(() => {
        if (profile.avatar) return profile.avatar
        if (profile.gender === GENDER.FEMALE) return femaleAvatar
        return maleAvatar
    }, [profile])

    const lastSeen = formatLastSeen(String(profile.lastSeen))

    return (
        <div className="about__top">
            <div className="profile__card">
                <div className="profile__card-header">
                    <div className="profile__card-image">
                        <img src={userAvatar} alt="" />
                    </div>
                    <div className="profile__card-details">
                        <div className="profile__card-title">
                            <div className="profile__card-name">
                                {profile.name} {profile.surname}
                            </div>
                            <div className={`time${lastSeen.isOnline ? ' online' : ''}`}>
                                {lastSeen.text}
                            </div>
                        </div>
                        <div className="profile__card-place">
                            {profile.age} лет{profile.city ? `, ${profile.city}` : ''}
                        </div>
                        <UserActions />
                    </div>
                </div>
            </div>
        </div>
    )
}
