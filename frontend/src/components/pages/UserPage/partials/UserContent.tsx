import type { ComponentType } from 'react'
import { useState } from 'react'
import { DescriptionBlock, PostBlock, AnouncementBlock } from '.'
import aboutBackground from '@/assets/images/about-bg.png'
import { ProfileCard } from './ProfileCard'
import { ProfileMenu, type ProfileTab } from './ProfileMenu'
import type { Profile } from '../utils/types'

interface UserContentProps {
    profile: Profile
    UserActions: ComponentType
}

const UserPartial: Record<ProfileTab, ComponentType<{ user: Profile }>> = {
    DESCRIPTION: DescriptionBlock,
    POSTS: PostBlock,
    ANNOUNCEMENTS: AnouncementBlock,
}

export function UserContent({ profile, UserActions }: UserContentProps) {
    const [activePartial, setActivePartial] = useState<ProfileTab>('DESCRIPTION')
    const Partial = UserPartial[activePartial]

    return (
        <section className="about">
            <img
                src={profile.banner || aboutBackground}
                alt=""
                className="about__bg"
            />
            <div className="container">
                <ProfileCard profile={profile} UserActions={UserActions} />
                <ProfileMenu
                    activeTab={activePartial}
                    postsCount={profile.posts?.length || 0}
                    announcementsCount={profile.announcements?.length || 0}
                    onTabChange={setActivePartial}
                />
                <Partial user={profile} />
            </div>
        </section>
    )
}
