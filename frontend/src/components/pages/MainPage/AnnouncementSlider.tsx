import { LoadStatus } from './types'
import { Announcement as AnnouncementComponent } from './partials/announcement/Announcement'
import { AnnouncementBottom } from './partials/announcement/AnnouncementBottom'
import { AnnouncementHeader } from './partials/announcement/AnnouncementHeader'
import type { AnnouncementResource } from '@/utils/api/types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'

interface AnnouncementSliderProps{
    loadStatus: LoadStatus
    announcements: AnnouncementResource[]
}

export function AnnouncementSlider({ loadStatus, announcements }: AnnouncementSliderProps) {
    return (
        <section className="announcement">
            <div className="container">
                <div className="announcement__top">
                    <AnnouncementHeader />
                    <div className="content">
                        {
                            (loadStatus == LoadStatus.READY) ? (
                                <Swiper
                                spaceBetween = { 50 }
                                slidesPerView=  { 4 }
                                modules={ [Navigation] }
                                navigation={{
                                    prevEl: '.prev',
                                    nextEl: '.next',
                                }}
                                loop
                                >
                                    {
                                        announcements.map((item) => (
                                            <SwiperSlide>
                                                <AnnouncementComponent  key = { item.id } {...item}/>
                                            </SwiperSlide>
                                        ))
                                    }
                                </Swiper>
                            ) : null
                        }
                    </div>
                </div>
                <AnnouncementBottom />
            </div>
        </section>
    )
}
