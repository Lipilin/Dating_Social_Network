import type { AnnouncementResource, InterestResource } from '@/utils/api/types'
import { AnnouncementInfoBlock } from './AnnouncementInfoBlock'
import { UserInfoBlock } from './UserInfoBlock'
import styles from './AnnouncementDetailContent.module.css'

interface AnnouncementDetailContentProps {
    announcement: AnnouncementResource & { interests?: InterestResource[] }
}

export function AnnouncementDetailContent({ announcement }: AnnouncementDetailContentProps) {
    return (
        <div className="container">
            <section className={styles.page}>
                { announcement.user && <UserInfoBlock user={announcement.user} /> }  
                <AnnouncementInfoBlock announcement={announcement} />
            </section>
        </div>
    )
}
