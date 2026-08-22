import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { NeedRegistration } from '@/components/pages/Errors/NeedRegistration'
import { ProfileContext } from '@/utils/context/ProfileContext'
import { Loader } from '@/components/pages/Loader/Loader'
import { useLocation } from 'react-router'  
import { Announcement } from '@/utils/api/Announcement'
import { NotFound } from '../Errors/NotFound'
import type { AnnouncementResource } from '@/utils/api/types'

const announcementProvider = new Announcement()
async function fetchAnnouncement(id: number) {
    if(isNaN(id)) throw Error()
    const announcement = await announcementProvider.getById(id)
    if(announcement == null) throw Error()
    return announcement
}

export function AnnouncementEdit() {
    const { id } = useParams()
    const { state } = useLocation()
    const { user, isLoading } = useContext(ProfileContext)
    const [announcement, setAnnouncement] = useState<AnnouncementResource | null>(null)
    const [hasError, setHasError] = useState(false)
    useEffect(() => {
        if(state?.announcement != null){
            setAnnouncement(state.announcement)
        }
        else {
            async function getAnnouncement() {
                const announcement = await fetchAnnouncement(Number(id))
                setAnnouncement(announcement)
            }
            getAnnouncement().catch(() => {
                setHasError(true)
            })
        }
    }, [id, state])
    if(hasError) return <NotFound />
    if(isLoading || !announcement) return <Loader isLoading={true} />
    if(user == null) return <NeedRegistration />

    return (
        <div className="section">
            <h2 className="section__title">Редактирование объявления</h2>
            <p>ID: {announcement.id}</p>
        </div>
    )
}
