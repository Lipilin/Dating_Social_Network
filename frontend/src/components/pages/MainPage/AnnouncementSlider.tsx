import { LoadStatus } from './types'
import { Announcement as AnnouncementComponent } from './partials/announcement/Announcement'
import { AnnouncementBottom } from './partials/announcement/AnnouncementBottom'
import { AnnouncementHeader } from './partials/announcement/AnnouncementHeader'
import type { AnnouncementResource } from '@/utils/api/types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import { NoDataFound } from '@/components/pages/Errors/NoDataFound'
import { DefaultButton } from '@/components/ui/buttons/DefaultButton'
import { ROUTES } from '@/config/General'
import { ProfileContext } from '@/utils/context/ProfileContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router'
import styles from './AnnouncementSlider.module.css'

interface AnnouncementSliderProps {
    loadStatus: LoadStatus
    announcements: AnnouncementResource[]
}

const ANNOUNCEMENT_SWIPER_BREAKPOINTS = {
    0: {
        slidesPerView: 1.1,
        spaceBetween: 10,
    },
    480: {
        slidesPerView: 2,
        spaceBetween: 10,
    },
    768: {
        slidesPerView: 2,
    },
    1024: {
        slidesPerView: 3,
    },
    1370: {
        slidesPerView: 4,
    },
}

export function AnnouncementSlider({ loadStatus, announcements }: AnnouncementSliderProps) {
    const { user, openAuthModal } = useContext(ProfileContext)
    const navigate = useNavigate()

    const handleCreateAnnouncement = () => {
        if (user == null) {
            openAuthModal?.()
        } else {
            navigate(ROUTES.ANNOUNCEMENT_CREATION.URL)
        }
    }

    const CreateAnnouncementButton = () => (
        <DefaultButton
            onSend={async () => { handleCreateAnnouncement() }}
            content="Создать объявление"
            classNames="need-registration__button"
        />
    )

    return (
        <section className="announcement">
            <div className="container">
                <div className="announcement__top">
                    <AnnouncementHeader />
                    <div className="content">
                        {
                            loadStatus == LoadStatus.READY && announcements.length > 0 ? (
                                <Swiper
                                    className="slider-wrapper swiper"
                                    wrapperClass="card-list swiper-wrapper"
                                    data-tab-content="text"
                                    style={{ display: 'block' }}
                                    modules={[Navigation]}
                                    loop
                                    grabCursor
                                    spaceBetween={30}
                                    navigation={{
                                        prevEl: '.prev',
                                        nextEl: '.next',
                                    }}
                                    breakpoints={ANNOUNCEMENT_SWIPER_BREAKPOINTS}
                                >
                                    {
                                        announcements.map((item) => (
                                            <SwiperSlide key={item.id} className="card">
                                                <AnnouncementComponent {...item} />
                                            </SwiperSlide>
                                        ))
                                    }
                                </Swiper>
                            ) : loadStatus == LoadStatus.READY ? (
                                <div className={styles.noDataWrapper}>
                                    <NoDataFound Button={CreateAnnouncementButton} embedded />
                                </div>
                            ) : null
                        }
                    </div>
                </div>
                <AnnouncementBottom />
            </div>
        </section>
    )
}
