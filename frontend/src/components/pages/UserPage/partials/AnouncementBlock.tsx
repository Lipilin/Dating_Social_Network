import type { UserResource } from '@/utils/api/types'
import { useContext } from 'react'
import { useNavigate } from 'react-router'
import { ROUTES } from '@/config/General'
import { ProfileContext } from '@/utils/context/ProfileContext'
import { Announcement } from './Announcement'
import { ProfileSectionEmpty } from './ProfileSectionEmpty'

export function AnouncementBlock({ user }: { user: UserResource }) {
    const { user: currentUser } = useContext(ProfileContext)
    const navigate = useNavigate()
    const isOwnProfile = currentUser?.id === user.id

    if (user.announcements.length === 0) {
        return (
            <ProfileSectionEmpty
                title="Объявлений пока нет"
                buttonText={isOwnProfile ? 'Создать объявление' : undefined}
                onAction={isOwnProfile ? () => navigate(ROUTES.ANNOUNCEMENT_CREATION.URL) : undefined}
            />
        )
    }

    return (
        <div className="locations__wrapper">
            {user.announcements.map((announcement) => (
                <Announcement
                    key={announcement.id}
                    {...announcement}
                    user={user}
                />
            ))}
        </div>
    )
}
