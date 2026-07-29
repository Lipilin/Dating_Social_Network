import type { AnnouncementResource } from '@/utils/api/types'
import { images } from './AnnouncementSlider.images'
import { AnnouncementGenderBLock } from './AnnouncementGenderBlock'

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
                                <a href="#" className="city">
                                    {item.departure}
                                    <span className="info_country">
                                        <img src={images['turkey.png']} alt="" />
                                        {item.departure}
                                    </span>
                                </a>
                                <svg width="6" height="11" viewBox="0 0 6 11" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.4" d="M1 10.1983L4.61449 5.68022L1 1.16211"
                                        stroke="black" strokeWidth="1.80724" />
                                </svg>
                                <a href="#" className="city">{item.destination}
                                    <span className="info_country">
                                        <img src={images['turkey.png']} alt="" />
                                        {item.destination}
                                    </span>
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