import { DefaultInput } from '@/components/ui/inputs/DefaultInput'
import { DefaultDropdown } from '@/components/ui/dropdowns/DefaultDropdown'
import { genderLabels } from '@/config/genderLabels'
import type { AnnouncementCreateRequest } from '@/utils/api/types'
import styles from '../AnnouncementCreation.module.css'

interface AnnouncementCreationMainProps {
    announcement: AnnouncementCreateRequest
    setAnnouncement: (announcement: AnnouncementCreateRequest) => void
}

export function AnnouncementCreationMain({ announcement, setAnnouncement }: AnnouncementCreationMainProps) {
    return (
        <>
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
            <DefaultDropdown
                value={announcement.genderPreference}
                setValue={(value) => setAnnouncement({ ...announcement, genderPreference: value })}
                labels={Object.values(genderLabels)}
                placeholder="Я ищу"
            />
            <div className={styles.textareaWrapper}>
                <textarea
                    placeholder=" "
                    value={announcement.description}
                    onChange={(e) => setAnnouncement({ ...announcement, description: e.target.value })}
                    id="announcement-description"
                />
                <label htmlFor="announcement-description">Описание</label>
            </div>
        </>
    )
}
