import type { AnnouncementResource } from '@/utils/api/types'
import { useState, useEffect, useContext } from 'react'
import { NoDataFound } from '../Errors/NoDataFound'
import { Announcement } from '@/utils/api/Announcement'
import { DefaultButton } from '@/components/ui/buttons/DefaultButton'
import { ROUTES } from '@/config/General'
import { ProfileContext } from '@/utils/context/ProfileContext'
import { useNavigate } from 'react-router'
import styles from './AnnouncementPage.module.css'
import { Announcement as AnnouncementCard } 
from '@/components/pages/MainPage/partials/announcement/Announcement'
import { DefaultPagination } from '@/components/ui/pagination/DefaultPagination'
import { Loader } from '@/components/pages/Loader/Loader'

const announcementService = new Announcement()
const TAKE = 12

export function AnnouncementPage() {
    const { user, openAuthModal } = useContext(ProfileContext)
    const navigate = useNavigate()
    const [announcements, setAnnouncements] = useState<AnnouncementResource[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [pagination, setPagination] = useState(0)

    const handleCreateAnnouncement = () => {
        if (user == null) {
            openAuthModal?.()
        } else {
            navigate(ROUTES.ANNOUNCEMENT_CREATION.URL)
        }
    }

    useEffect(() => {
        announcementService.getDataWithClauses({
            take: TAKE, 
            skip: pagination * TAKE,
        }).then((data) => {
            setAnnouncements(data)
            setIsLoading(false)
        })
    }, [pagination])

    if(isLoading){
        return <Loader isLoading = { isLoading } />
    }

    if(announcements.length == 0){
        const CreateAnnouncementButton = () => (
            <DefaultButton
                onSend={async () => { handleCreateAnnouncement() }}
                content="Создать объявление"
                classNames="need-registration__button"
            />
        )

        return (
            <NoDataFound Button={CreateAnnouncementButton} />
        )
    }

    return (
        <section className="announcement">
            <div className="container">
                <div className="announcement__top">
                    <div className="slide-tab">
                        <div className="left">
                            <h2 className="section__title">Объявления</h2>
                        </div>
                    </div>
                    <div className="content">
                        <div className={styles.cardList}>
                            {announcements.map((item) => (
                                <div className="card" key={item.id}>
                                    <AnnouncementCard {...item} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="announcements-block-pagination">
                    <DefaultPagination 
                        prevPageDisabled = { pagination == 0 }
                        nextPageDisabled = { announcements.length < TAKE }
                        onPrevPage = { () => setPagination(pagination - 1) }
                        onNextPage = { () => setPagination(pagination + 1) }
                        paginationNumber = { pagination + 1 }
                    />
                </div>
            </div>
        </section>
    )
}
