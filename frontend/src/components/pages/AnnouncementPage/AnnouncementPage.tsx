import type { AnnouncementResource } from '@/utils/api/types'
import { useState, useEffect } from 'react'
import { NoDataFound } from '../Errors/NoDataFound'
import { Announcement } from '@/utils/api/Announcement'
import { DefaultButton } from '@/components/ui/buttons/DefaultButton'
import styles from './AnnouncementPage.module.css'
import { Announcement as AnnouncementCard } 
from '@/components/pages/MainPage/partials/announcement/Announcement'
import { DefaultPagination } from '@/components/ui/pagination/DefaultPagination'
import { Loader } from '@/components/pages/Loader/Loader'

const announcementService = new Announcement()
const TAKE = 12

export function AnnouncementPage() {
    const [announcements, setAnnouncements] = useState<AnnouncementResource[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [pagination, setPagination] = useState(0)

    useEffect(() => {
        announcementService.getDataWithClauses({
            take: TAKE, 
            skip: pagination * TAKE,
        }).then((data) => {
            setAnnouncements(data)
        }).finally(() => {
            setIsLoading(false)
        })
    }, [pagination])

    if(isLoading){
        return <Loader isLoading = { isLoading } />
    }

    if(announcements.length == 0){
        return (
            <NoDataFound 
                Button = { () => <DefaultButton onSend = { async () => { await console.log('send') } } 
                content = { 'Создать объявление' } 
                classNames = { 'need-registration__button' } /> } 
            />
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
                        prevPageBlock = { pagination == 0 }
                        nextPageBlock = { announcements.length < TAKE }
                        onPrevPage = { () => setPagination(pagination - 1) }
                        onNexPage = { () => setPagination(pagination + 1) }
                        paginationNumber = { pagination + 1 }
                    />
                </div>
            </div>
        </section>
    )
}
