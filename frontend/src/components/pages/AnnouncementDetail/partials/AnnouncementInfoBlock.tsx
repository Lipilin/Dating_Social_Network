import type { AnnouncementResource, InterestResource } from '@/utils/api/types'
import { ROUTES } from '@/config/General'
import { AnnouncementInterestsBlock } from './AnnouncementInterestsBlock'
import { GenderPreferenceBlock } from './GenderPreferenceBlock'
import styles from './AnnouncementInfoBlock.module.css'

interface AnnouncementInfoBlockProps {
    announcement: AnnouncementResource & { interests?: InterestResource[] }
}

export function AnnouncementInfoBlock({ announcement }: AnnouncementInfoBlockProps) {
    const {
        title,
        description,
        genderInterest,
        departure,
        destination,
        dateFrom,
        dateTo,
        createdAt,
        interests,
    } = announcement

    return (
        <article className={styles.block}>
            <h1 className={styles.title}>{title}</h1>

            <div className={styles.route}>
                <a href={ROUTES.DESTINATION.URL} className={styles.city}>
                    {departure}
                </a>
                <svg
                    className={styles.arrow}
                    width="6"
                    height="11"
                    viewBox="0 0 6 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <path
                        opacity="0.4"
                        d="M1 10.1983L4.61449 5.68022L1 1.16211"
                        stroke="black"
                        strokeWidth="1.80724"
                    />
                </svg>
                <a href={ROUTES.DESTINATION.URL} className={styles.city}>
                    {destination}
                </a>
            </div>

            <GenderPreferenceBlock gender={genderInterest} />

            <p className={styles.dates}>
                с {new Date(dateFrom).toLocaleDateString('ru-RU')} по{' '}
                {new Date(dateTo).toLocaleDateString('ru-RU')}
            </p>

            <p className={styles.published}>
                Опубликовано:{' '}
                <span>{new Date(createdAt).toLocaleDateString('ru-RU')}</span>
            </p>

            <div className={styles.description}>
                <h2 className={styles.sectionTitle}>Описание</h2>
                <p className={styles.descriptionText}>{description}</p>
            </div>

            <AnnouncementInterestsBlock interests={interests} />
        </article>
    )
}
