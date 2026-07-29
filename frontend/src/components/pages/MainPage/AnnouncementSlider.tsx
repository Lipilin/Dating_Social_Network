import { useState, useEffect } from 'react'
import type { Announcement } from '@/utils/api/Announcement'
import type { AnnouncementResource } from '@/utils/api/types'
import { LoadStatus } from './types'
import { Announcement as AnnouncementComponent } from './partials/announcement/Announcement'
import { AnnouncementBottom } from './partials/announcement/AnnouncementBottom'
import { AnnouncementHeader } from './partials/announcement/AnnouncementHeader'

interface AnnouncementSliderProps{
    dataProvider: Announcement
}

export function AnnouncementSlider({ dataProvider }: AnnouncementSliderProps) {
    const [announcements, setAnnouncements] = useState<AnnouncementResource[]>([])
    const [loadStatus, setLoadStatus] = useState<LoadStatus>(LoadStatus.LOADING)
    useEffect(()=>{
        async function getAnnouncements(){
            const data: AnnouncementResource[] = await dataProvider.getLast()
            setAnnouncements(data)
            setLoadStatus(LoadStatus.READY)
        }
    }, [])
    return (
    <section className="announcement">
        <div className="container">
            <div className="announcement__top">
                <AnnouncementHeader />
                <div className="content">
                    {(loadStatus == LoadStatus.READY) ? announcements.map((item) => (
                        <AnnouncementComponent {...item}/>
                    )) : null}
                    
                </div>
            </div>
            <AnnouncementBottom />
        </div>
    </section>
    )
}
