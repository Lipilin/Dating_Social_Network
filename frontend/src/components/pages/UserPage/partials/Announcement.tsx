import type { AnnouncementResource } from '@/utils/api/types'
import { GENDER_PREFERENCE } from '@/utils/api/types'
import { ROUTES, genderLabels } from '@/config/General'
import arrowRightSvg from '@/assets/images/arrow_right.svg'
import location1Png from '@/assets/images/location_1.png'
import location2Png from '@/assets/images/location_2.png'
import location3Png from '@/assets/images/location_3.png'
import avatarFemaleSvg from '@/assets/images/avatar_female.svg'
import avatarMaleSvg from '@/assets/images/avatar_male.svg'
import avatarGroupSvg from '@/assets/images/avatar_group.svg'

const locationImages = [location1Png, location2Png, location3Png]

const genderAvatarClass: Record<GENDER_PREFERENCE, string> = {
    [GENDER_PREFERENCE.FEMALE]: 'j',
    [GENDER_PREFERENCE.MALE]: 'm',
    [GENDER_PREFERENCE.ANYBODY]: 'k',
}

const genderAvatarSrc: Record<GENDER_PREFERENCE, string> = {
    [GENDER_PREFERENCE.FEMALE]: avatarFemaleSvg,
    [GENDER_PREFERENCE.MALE]: avatarMaleSvg,
    [GENDER_PREFERENCE.ANYBODY]: avatarGroupSvg,
}

function formatAnnouncementDate(date: string) {
    return new Date(date).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })
}

interface AnnouncementProps extends AnnouncementResource {
    imageIndex?: number
}

export function Announcement({
    title,
    genderInterest,
    description,
    dateFrom,
    dateTo,
    departure,
    destination,
    imageIndex = 0,
}: AnnouncementProps) {
    const image = locationImages[imageIndex % locationImages.length]

    return (
        <div className="locations__item">
            <div className="locations__item-left">
                <img className="locations__item-img" src={image} alt="" />
                <div className="locations__item-info">
                    <div className="locations__item-place">
                        <a href={ROUTES.DESTINATION.URL} className="city">
                            {departure}
                        </a>
                        <img src={arrowRightSvg} alt="" />
                        <a href={ROUTES.DESTINATION.URL} className="city">
                            {destination}
                        </a>
                    </div>
                    <p>
                        с {formatAnnouncementDate(dateFrom)} по {formatAnnouncementDate(dateTo)}
                    </p>
                    <div className={`search__who ${genderAvatarClass[genderInterest]}`}>
                        <span>
                            <img src={genderAvatarSrc[genderInterest]} alt="" />
                        </span>
                        {genderLabels[genderInterest].label}
                    </div>
                    <div className="locations__item-published">
                        Опубликовано: <span>{formatAnnouncementDate(dateFrom)}</span>
                    </div>
                </div>
            </div>
            <div className="locations__item-right">
                <div className="locations__item-desc">{description}</div>
                <div className="locations__item-bottom">
                    <a href={ROUTES.ANNOUNCEMENT.URL} className="locations__item-btn">
                        <span>Подробнее</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="7" height="10" viewBox="0 0 7 10" fill="none">
                            <path d="M1 9L5 5L1 1" stroke="#0041F2" strokeWidth="2" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    )
}
