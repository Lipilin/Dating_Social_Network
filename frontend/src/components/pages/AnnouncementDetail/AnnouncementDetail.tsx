import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { Announcement} from '@/utils/api/Announcement'
import { NotFound } from '@/components/pages/Errors/NotFound'
import type { AnnouncementResource } from '@/utils/api/types'
import { AnnouncementDetailContent } from './partials'

const announcementService = new Announcement()

export function AnnouncementDetail() {
    const { id } = useParams()
    const [announcement, setAnnouncement] = useState<AnnouncementResource | null>(null)
    useEffect(() => {
        async function getAnnouncement(){
            if(!id) return
            const result = await announcementService.getById(id)
            setAnnouncement(result)
        }
        getAnnouncement()
    }, [id])

    if(!announcement) return <NotFound />
    return <AnnouncementDetailContent announcement={announcement} />
}