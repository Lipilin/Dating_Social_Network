import type { AnnouncementCreateRequest, CategoryWithInterestResource } from '@/utils/api/types'
import { InterestCategoryItem } from '@/components/pages/Registration/partials/InterestCategoryItem'
import styles from '../AnnouncementCreation.module.css'

interface AnnouncementCreationInterestsProps {
    announcement: AnnouncementCreateRequest
    setAnnouncement: (announcement: AnnouncementCreateRequest) => void
    categories: CategoryWithInterestResource[]
}

export function AnnouncementCreationInterests({
    announcement,
    setAnnouncement,
    categories,
}: AnnouncementCreationInterestsProps) {
    const interestCategories = categories.filter((category) => category.isCountry === false)

    return (
        <div className={styles.announcementCreationInterests}>
            <div className="interest">
                {interestCategories.map((category) => (
                    <InterestCategoryItem
                        key={category.id}
                        category={category}
                        selectedInterests={announcement.interests}
                        onInterestsChange={(interests) => setAnnouncement({ ...announcement, interests })}
                    />
                ))}
            </div>
        </div>
    )
}
