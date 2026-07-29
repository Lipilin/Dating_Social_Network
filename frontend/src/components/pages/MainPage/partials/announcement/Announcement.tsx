import type { AnnouncementResource } from '@/utils/api/types'
import { images } from './AnnouncementSlider.images'
import { AnnouncementGenderBLock } from './AnnouncementGenderBlock'
import { default as arrow } from '@/assets/images/arrow-gray.svg'

export function Announcement(item: AnnouncementResource){
    return (
        <div data-tab-content="text" className="slider-wrapper swiper" style={{ display: 'block' }}>
            <div className="card-list swiper-wrapper">
                <div className="card swiper-slide">
                    <div className="card__image">
                        <img src={images['announcement_1.png']} alt={item.title} />
                    </div>
                    <div className="card__info">
                        <div className="card__info-top">
                            <div className="card__item">
                                <h3>{item.title}</h3>
                            </div>
                            <small>{item.userAge} года</small>
                            <AnnouncementGenderBLock gender = { item.genderInterest }/>
                            <p className="limited-text">
                                { item.description }
                            </p>
                            <a className="show-mores">Показать дальше</a>
                        </div>
                        <div className="card__info-bottom">
                            <h4>
                                <a className="city">
                                    {item.departure}
                                </a>
                                <img src = { arrow }/>
                                <a className="city">
                                    {item.destination}
                                </a>
                            </h4>
                            <h5>
                                с { item.dateFrom } по {item.dateTo }
                            </h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}