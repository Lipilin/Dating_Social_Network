import type { UserResource } from '@/utils/api/types'
import type { ComponentType } from 'react'
import { useState } from 'react'
import { DescriptionBlock, PostBlock, AnouncementBlock } from '.'
import aboutBackground from '@/assets/images/about-bg.png'
import { ProfileCard } from './ProfileCard'
import { ProfileMenu, type ProfileTab } from './ProfileMenu'

interface UserContentProps {
    profile: UserResource
    UserActions: ComponentType
}

const UserPartial: Record<ProfileTab, ComponentType<{ user: UserResource }>> = {
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
                    postsCount={profile.posts.length}
                    announcementsCount={profile.announcements.length}
                    onTabChange={setActivePartial}
                />
                <Partial user={profile} />
            </div>
        </section>
    )
}
