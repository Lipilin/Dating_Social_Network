import type { UserResource } from "@/utils/api/types"
import type { ComponentType } from "react"
import { useState, useMemo } from "react"
import { DescriptionBlock, PostBlock, AnouncementBlock } from '.'
import headBackground from '@/assets/images/head_bg.png'
import { default as femaleAvatar } from '@/assets/images/avatar_female.png'
import { default as maleAvatar } from '@/assets/images/avatar_male.webp'
import { GENDER } from '@/utils/api/types'
import { Link } from 'react-router'

interface UserContentProps {
    profile: UserResource
    UserActions: ComponentType<any>
}

const UserPartial: Record<string, ComponentType< {user: UserResource }>> = {
    DESCRIPTION: DescriptionBlock,
    POSTS: PostBlock,
    ANNOUNCEMENTS: AnouncementBlock,
}

export function UserContent({ profile, UserActions }: UserContentProps){
    const [activePartial, setActivePartial] = useState<keyof typeof UserPartial>('DESCRIPTION')
    const userAvatar = useMemo(() => {
        if(profile?.avatar) return profile.avatar
        else if(profile?.gender === GENDER.FEMALE) return femaleAvatar
        else return maleAvatar
    }, [profile])
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
                                userAvatar 
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
                            <Link
                            className={activePartial === 'DESCRIPTION' ? 'active' : ''}
                            to="#" 
                            onClick={() => setActivePartial('DESCRIPTION')}>
                                О себе
                            </Link>
                        </li>
                        <li>
                            <Link
                            to="#"
                            className={activePartial === 'POSTS' ? 'active' : ''}
                            onClick={() => setActivePartial('POSTS')}>
                                Посты ({ profile?.posts.length || 0 })
                            </Link>
                        </li>
                        <li>
                            <Link 
                            to="#" 
                            className={activePartial === 'ANNOUNCEMENTS' ? 'active' : ''} 
                            onClick={() => setActivePartial('ANNOUNCEMENTS')}>
                                Объявления ({ profile?.announcements.length || 0 })
                            </Link>
                        </li>
                    </ul>
                </div>
                {profile && <Partial user = { profile }/>}
            </div>
        </section>
    )
}