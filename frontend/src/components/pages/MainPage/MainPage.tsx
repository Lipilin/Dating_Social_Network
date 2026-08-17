import { useState, useEffect, useCallback, useContext } from 'react'
import {
    SearchForm,
    InterestBlock,
    AnnouncementSlider,
    Banner
} from './index'
import { Announcement } from '@/utils/api/Announcement'
import type { AnnouncementResource } from '@/utils/api/types'
import { LoadStatus } from './types'
import { API_SETTINGS } from '@/config/General'
import type { AnnouncementRequest } from '@/utils/api/types'
import { CategoryContext } from '@/utils/context/CategoryContext'
import { Loader } from '@/components/pages/Loader/Loader'

const announcement = new Announcement()

export function MainPage() {
    const { categories } = useContext(CategoryContext)
    const [announcements, setAnnouncements] = useState<AnnouncementResource[]>([])
    const [loadStatus, setLoadStatus] = useState<LoadStatus>(LoadStatus.LOADING)

    useEffect(() => {
        async function getAnnouncements() {
            const data: AnnouncementResource[] = await announcement.getLast({
                take: API_SETTINGS.DEFAULT_PAGINATION, 
                skip: 0
            })
            setAnnouncements(data)
            setLoadStatus(LoadStatus.READY)
        }
        getAnnouncements()
    }, [])

    const setData = useCallback(async (request: AnnouncementRequest) => {
        setLoadStatus(LoadStatus.LOADING)
        const response: AnnouncementResource[] = await announcement.getDataWithClauses(request)
        setAnnouncements(response)
        setLoadStatus(LoadStatus.READY)
    }, [])

    return (
        <>
            <Banner />
            <SearchForm loadStatus={loadStatus} setData={setData} categories={categories} />
            {loadStatus === LoadStatus.LOADING ? (
                <Loader isLoading={true} />
            ) : (
                <AnnouncementSlider announcements={announcements} loadStatus={loadStatus} />
            )}
            <section className="friends">
                <div className="container">
                    <div className="row">
                        <InterestBlock />
                    </div>
                </div>
            </section>
        </>
    )
}
