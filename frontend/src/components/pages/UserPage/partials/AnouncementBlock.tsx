import { useCallback, useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { ROUTES } from '@/config/General'
import { ProfileContext } from '@/utils/context/ProfileContext'
import { Announcement } from '@/utils/api/Announcement'
import { AnnouncementDeleteRequest } from '@/utils/api/types'
import { Announcement as AnnouncementCard } from './Announcement'
import { ContentItemActions } from './ContentItemActions'
import { ProfileSectionEmpty } from './ProfileSectionEmpty'
import type { Profile } from '../utils/types'
import type { AnnouncementResource } from '@/utils/api/types'
import { DeleteEntityModal } from '@/components/layout/Modals'

const announcementApi = new Announcement()

export function AnouncementBlock({ user }: { user: Profile }) {
    const { user: currentUser, userProvider, setUser } = useContext(ProfileContext)
    const [isDeleting, setIsDeleting] = useState(false)
    const [announcementToDelete, setAnnouncementToDelete] = useState<AnnouncementResource | null>(null)
    const navigate = useNavigate()
    const isOwnProfile = currentUser?.id === user.id

    const editAnnouncement = useCallback((announcement: AnnouncementResource) => {
        navigate(ROUTES.ANNOUNCEMENT_EDIT.URL.replace(':id', String(announcement.id)))
    }, [navigate])

    const deleteAnnouncement = useCallback(async () => {
        if (!announcementToDelete || !userProvider) {
            throw new Error('Не удалось удалить объявление')
        }

        await userProvider.withRefreshing(async () => {
            return announcementApi.deleteAnnouncement(
                new AnnouncementDeleteRequest(announcementToDelete.id),
            )
        })
    }, [announcementToDelete, userProvider, currentUser, setUser])

    const handleCloseDeleteModal = useCallback(() => {
        setIsDeleting(false)
        setAnnouncementToDelete(null)
    }, [])

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
                <AnnouncementCard
                    key={announcement.id}
                    {...announcement}
                    actions={
                        user.isCurrentProfile ? (
                            <ContentItemActions
                                onEdit={() => editAnnouncement(announcement)}
                                onDelete={() => {
                                    setAnnouncementToDelete(announcement)
                                    setIsDeleting(true)
                                }}
                            />
                        ) : null
                    }
                />
            ))}
            {isDeleting && (
                <DeleteEntityModal
                    onDelete={deleteAnnouncement}
                    onClose={handleCloseDeleteModal}
                />
            )}
        </div>
    )
}
