import { useState, useEffect } from 'react'
import headBackground from '@/assets/images/head_bg.png'
import messageIcon from '@/assets/images/type_icon.png'
import type { UserResource } from '@/utils/api/types'
import { User } from '@/utils/api/User'
import { DescriptionBlock, PostBlock, AnouncementBlock } from './partials'
import type { ComponentType } from 'react'

const user = new User()
const UserPartial: Record<string, ComponentType< {user: UserResource }>> = {
    DESCRIPTION: DescriptionBlock,
    POSTS: PostBlock,
    ANNOUNCEMENTS: AnouncementBlock,
}
type UserPartialType = 'DESCRIPTION' | 'POSTS' | 'ANNOUNCEMENTS'

export function ProfilePage() {
    const [profile, setProfile] = useState<UserResource | null>(null)
    const [activePartial, setActivePartial] = useState<UserPartialType>('DESCRIPTION')
    useEffect(() => {
        async function fetchUser(){
            const profile: UserResource | null = await user.getProfile()
            setProfile(profile)
        }
        fetchUser()
    }, [])
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
                            <img src={ profile?.avatar } alt="" />
                        </div>
                        <div>
                            <h4 className="head__profile-name">{ profile?.name }</h4>
                            <div className="time"> { profile?.lastSeen } </div>
                        </div>
                    </div>
                    <div className="head__profile-buttons">
                        <a href="#" className="write">
                            <img src={messageIcon} alt="" />
                            <span>Написать</span>
                        </a>
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
                                Посты ({ profile?.posts.length })
                            </a>
                        </li>
                        <li>
                            <a 
                            href="#" 
                            className={activePartial === 'ANNOUNCEMENTS' ? 'active' : ''} 
                            onClick={() => setActivePartial('ANNOUNCEMENTS')}>
                                Объявления ( { profile?.announcements.length } )
                            </a>
                        </li>
                    </ul>
                </div>
                {profile && <Partial user = { profile }/>}
            </div>
        </section>
    )
}
