import type { UserResource } from '@/utils/api/types'
import { Announcement } from './Announcement'

export function AnouncementBlock({ user }: { user: UserResource }) {
    return (
        <div className="locations__wrapper">
            {user.announcements.map((announcement, index) => (
                <Announcement
                    key={announcement.id}
                    {...announcement}
                    user={user}
                    imageIndex={index}
                />
            ))}
        </div>
    )
}
