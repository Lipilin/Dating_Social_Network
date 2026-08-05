import type { AnnouncementResource } from '@/utils/api/types'
import { AnnouncementGenderBLock } from './AnnouncementGenderBlock'
import { ROUTES } from '@/config/General'

export function Announcement(item: AnnouncementResource) {
    return (
        <>
            <div className="card__image">
                <img src={ item.user.avatar } alt={ item.user.avatar } />
            </div>
            <div className="card__info">
                <div className="card__info-top">
                    <div className="card__item">
                        <h3>{item.user.name} {item.user.surname}</h3>
                    </div>
                    <small>{ item.user.age } года</small>
                    <AnnouncementGenderBLock gender={item.genderInterest} />
                    <p className="limited-text">
                        {item.description}
                    </p>
                    <a 
                        href = {ROUTES.ANNOUNCEMENT_DETAIL.URL.replace(':id', item.id)} 
                        className="show-mores">
                        Показать дальше
                    </a>
                </div>
                <div className="card__info-bottom">
                    <h4>
                        <a href={ROUTES.DESTINATION.URL} className="city">
                            {item.departure}
                        </a>
                        <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                opacity="0.4"
                                d="M1 10.1983L4.61449 5.68022L1 1.16211"
                                stroke="black"
                                strokeWidth="1.80724"
                            />
                        </svg>
                        <a href={ROUTES.DESTINATION.URL} className="city">
                            {item.destination}
                        </a>
                    </h4>
                    <h5>
                        с { new Date(item.dateFrom).toLocaleDateString('ru-RU') } по { new Date(item.dateTo).toLocaleDateString('ru-RU') }
                    </h5>
                </div>
            </div>
        </>
    )
}
