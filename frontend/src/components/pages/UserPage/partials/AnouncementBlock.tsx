import { useCallback, useContext } from 'react'
import { useNavigate } from 'react-router'
import { ROUTES } from '@/config/General'
import { ProfileContext } from '@/utils/context/ProfileContext'
import { Announcement } from './Announcement'
import { ContentItemActions } from './ContentItemActions'
import { ProfileSectionEmpty } from './ProfileSectionEmpty'
import type { Profile } from '../utils/types'
import type { AnnouncementResource } from '@/utils/api/types'

export function AnouncementBlock({ user }: { user: Profile }) {
    const { user: currentUser } = useContext(ProfileContext)
    const navigate = useNavigate()
    const isOwnProfile = currentUser?.id === user.id

    const editAnnouncement = useCallback((announcement: AnnouncementResource) => {
        navigate(ROUTES.ANNOUNCEMENT_EDIT.URL.replace(':id', String(announcement.id)))
    }, [navigate])

    if (!user.announcements || user.announcements.length === 0) {
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
                    actions={
                        user.isCurrentProfile ? (
                            <ContentItemActions onEdit={() => editAnnouncement(announcement)} />
                        ) : null
                    }
                />
            ))}
        </div>
    )
}
