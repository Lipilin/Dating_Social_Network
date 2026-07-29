import { LoadStatus } from './types'
import { Announcement as AnnouncementComponent } from './partials/announcement/Announcement'
import { AnnouncementBottom } from './partials/announcement/AnnouncementBottom'
import { AnnouncementHeader } from './partials/announcement/AnnouncementHeader'
import type { AnnouncementResource } from '@/utils/api/types'

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
                        {(loadStatus == LoadStatus.READY) ? announcements.map((item) => (
                            <AnnouncementComponent  key = { item.id } {...item}/>
                        )) : null}
                    
                    </div>
                </div>
                <AnnouncementBottom />
            </div>
        </section>
    )
}
