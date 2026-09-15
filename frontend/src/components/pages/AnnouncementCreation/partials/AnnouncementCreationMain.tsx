import { DefaultInput } from '@/components/ui/inputs/DefaultInput'
import { GenderPreferenceSelector } from '@/components/ui/inputs/GenderPreferenceSelector'
import type { AnnouncementCreateRequest } from '@/utils/api/types'
import { EditIcon, useImageSrc } from '@/components/layout/Partials/EditImage'
import styles from '../AnnouncementCreation.module.css'

interface AnnouncementCreationMainProps {
    announcement: AnnouncementCreateRequest
    setAnnouncement: (announcement: AnnouncementCreateRequest) => void
}

export function AnnouncementCreationMain({ announcement, setAnnouncement }: AnnouncementCreationMainProps) {
    const iconSrc = useImageSrc(announcement.file, announcement.icon)

    return (
        <div className={styles.announcementEditContainer}>
            <div className={styles.announcementEditText}>
                <div className={styles.announcementCreationFormContent}>
                    <div className={styles.inputWrapper}>
                        <DefaultInput
                            id="announcement-title"
                            value={announcement.title}
                            setValue={(value) => setAnnouncement({ ...announcement, title: value })}
                            label="Заголовок"
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <DefaultInput
                            id="announcement-departure"
                            value={announcement.departure}
                            setValue={(value) => setAnnouncement({ ...announcement, departure: value })}
                            label="Откуда"
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <DefaultInput
                            id="announcement-destination"
                            value={announcement.destination}
                            setValue={(value) => setAnnouncement({ ...announcement, destination: value })}
                            label="Куда"
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <input
                            type="date"
                            placeholder=" "
                            value={announcement.dateFrom}
                            onChange={(e) => setAnnouncement({ ...announcement, dateFrom: e.target.value })}
                            id="announcement-date-from"
                        />
                        <label htmlFor="announcement-date-from">Дата начала</label>
                    </div>
                    <div className={styles.inputWrapper}>
                        <input
                            type="date"
                            placeholder=" "
                            value={announcement.dateTo}
                            onChange={(e) => setAnnouncement({ ...announcement, dateTo: e.target.value })}
                            id="announcement-date-to"
                        />
                        <label htmlFor="announcement-date-to">Дата окончания</label>
                    </div>
                    <div className={styles.inputWrapper}>
                        <DefaultInput
                            id="announcement-user-age"
                            type="number"
                            value={announcement.userAge}
                            setValue={(value) => setAnnouncement({ ...announcement, userAge: Number(value) })}
                            label="Возраст"
                        />
                    </div>
                </div>
                <div className={styles.textareaWrapper}>
                    <textarea
                        placeholder=" "
                        value={announcement.description}
                        onChange={(e) => setAnnouncement({ ...announcement, description: e.target.value })}
                        id="announcement-description"
                    />
                    <label htmlFor="announcement-description">Описание</label>
                </div>
                <GenderPreferenceSelector
                    value={announcement.genderPreference}
                    onChange={(value) => setAnnouncement({ ...announcement, genderPreference: value })}
                />
            </div>
            <div className={styles.announcementEditImage}>
                <EditIcon
                    className={styles.announcementEditIcon}
                    imageSrc={iconSrc}
                    rules="Иконка должна быть в формате PNG, JPEG или JPG и не превышать 5MB"
                    onChange={(image) => setAnnouncement({ ...announcement, file: image })}
                />
            </div>
        </div>
    )
}
