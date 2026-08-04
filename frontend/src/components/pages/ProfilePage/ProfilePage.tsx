import { useState } from 'react'
import headBackground from '@/assets/images/head_bg.png'
import type { UserResource } from '@/utils/api/types'
import { DescriptionBlock, PostBlock, AnouncementBlock } from './partials'
import type { ComponentType } from 'react'
import { default as femaleAvatar } from '@/assets/images/avatar_female.svg'
import { default as maleAvatar } from '@/assets/images/avatar_male.svg'
import { GENDER } from '@/utils/api/types'

const UserPartial: Record<string, ComponentType< {user: UserResource }>> = {
    DESCRIPTION: DescriptionBlock,
    POSTS: PostBlock,
    ANNOUNCEMENTS: AnouncementBlock,
}
type UserPartialType = 'DESCRIPTION' | 'POSTS' | 'ANNOUNCEMENTS'

interface ProfilePageProps {
    profile: UserResource
    UserActions: ComponentType<any>
}

export function ProfilePage({profile, UserActions}: ProfilePageProps) {
    const [activePartial, setActivePartial] = useState<UserPartialType>('DESCRIPTION')
    const Partial = UserPartial[activePartial]
    return (
        <section className="head">
            <div className="container">
                <div className="head__image">
                    <img src={profile?.banner || headBackground} alt="" />
                </div>
                <div className="head__profile">
                    <div className="head__profile-infos">
                        <div className="head__profile-avatar">
                            <img 
                            src={ 
                                profile?.avatar 
                            } 
                            alt="" />
                        </div>
                        <div>
                            <h4 className="head__profile-name">{ profile?.name } { profile?.surname }</h4>
                            <div className="time"> { new Date(profile?.lastSeen).toLocaleString('ru-RU') } </div>
                        </div>
                        <UserActions />
                    </div>
                </div>
                <div className="profile__menu">
                    <ul>
                        <li>
                            <a
                            className={activePartial === 'DESCRIPTION' ? 'active' : ''}
                            href="#" 
                            onClick={() => setActivePartial('DESCRIPTION')}>
                                О себе
                            </a>
                        </li>
                        <li>
                            <a
                            href="#"
                            className={activePartial === 'POSTS' ? 'active' : ''}
                            onClick={() => setActivePartial('POSTS')}>
                                Посты ({ profile?.posts.length || 0 })
                            </a>
                        </li>
                        <li>
                            <a 
                            href="#" 
                            className={activePartial === 'ANNOUNCEMENTS' ? 'active' : ''} 
                            onClick={() => setActivePartial('ANNOUNCEMENTS')}>
                                Объявления ({ profile?.announcements.length || 0 })
                            </a>
                        </li>
                    </ul>
                </div>
                {profile && <Partial user = { profile }/>}
            </div>
        </section>
    )
}
