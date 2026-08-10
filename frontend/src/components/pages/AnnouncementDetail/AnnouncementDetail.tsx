import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { Announcement} from '@/utils/api/Announcement'
import { NotFound } from '@/components/pages/Errors/NotFound'
import type { AnnouncementResource } from '@/utils/api/types'
import { AnnouncementDetailContent } from './partials'
import { Loader } from '@/components/pages/Loader/Loader'

const announcementService = new Announcement()

export function AnnouncementDetail() {
    const { id } = useParams()
    const [announcement, setAnnouncement] = useState<AnnouncementResource | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        async function getAnnouncement(){
            if(!id) return
            const result = await announcementService.getById(Number(id))
            setAnnouncement(result)
        }
        getAnnouncement().finally(() => {
            setIsLoading(false)
        })
    }, [id])

    if(isLoading){
        return <Loader isLoading = { isLoading } />
    }

    if(!announcement) return <NotFound />
    return <AnnouncementDetailContent announcement={announcement} />
}