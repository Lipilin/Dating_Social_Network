import type { AnnouncementResource } from '@/utils/api/types'
import { GENDER_PREFERENCE } from '@/utils/api/types'
import { ROUTES, genderLabels } from '@/config/General'
import arrowRightSvg from '@/assets/images/arrow_right.svg'
import location1Png from '@/assets/images/location_1.png'
import avatarFemaleSvg from '@/assets/images/avatar_female.svg'
import avatarMaleSvg from '@/assets/images/avatar_male.svg'
import avatarGroupSvg from '@/assets/images/avatar_group.svg'
import { Link } from 'react-router'
import { type ReactNode } from 'react'
import { contentItemActionsStyles } from './ContentItemActions'


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

export function Announcement({
    id, 
    title,
    genderInterest,
    description,
    dateFrom,
    dateTo,
    departure,
    destination,
    icon = "", 
    createdAt,
    actions,
}: AnnouncementResource & { actions?: ReactNode }) {
    return (
        <div className={`locations__item ${actions ? contentItemActionsStyles.itemRelative : ''}`}>
            {actions}
            <div className="locations__item-left">
                <img className="locations__item-img" src={ icon || location1Png } alt="" />
                <div className="locations__item-info">
                    <h3 className={`locations__item-title ${actions ? contentItemActionsStyles.titleWithActions : ''}`}>
                        {title}
                    </h3>
                    <div className="locations__item-place">
                        <Link to={ROUTES.DESTINATION.URL} className="city">
                            {departure}
                        </Link>
                        <img src={arrowRightSvg} alt="" />
                        <Link to={ROUTES.DESTINATION.URL} className="city">
                            {destination}
                        </Link>
                    </div>
                    <p>
                        с {new Date(dateFrom).toLocaleDateString('ru-RU')} по {new Date(dateTo).toLocaleDateString('ru-RU')}
                    </p>
                    <div className={`search__who ${genderAvatarClass[genderInterest]}`}>
                        <span>
                            <img src={genderAvatarSrc[genderInterest]} alt="" />
                        </span>
                        {genderLabels[genderInterest].label}
                    </div>
                    <div className="locations__item-published">
                        Опубликовано: <span>{new Date(createdAt).toLocaleDateString('ru-RU')}</span>
                    </div>
                </div>
            </div>
            <div className="locations__item-right">
                <div className="locations__item-desc">{description}</div>
                <div className="locations__item-bottom">
                    <Link to={ ROUTES.ANNOUNCEMENT_DETAIL.URL.replace(':id', String(id)) } className="locations__item-btn">
                        <span>Подробнее</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="7" height="10" viewBox="0 0 7 10" fill="none">
                            <path d="M1 9L5 5L1 1" stroke="#0041F2" strokeWidth="2" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    )
}
