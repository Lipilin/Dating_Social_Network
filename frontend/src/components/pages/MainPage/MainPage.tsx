import { useState, useEffect, useCallback } from 'react'
import {
    SearchForm,
    InterestBlock,
    AnnouncementSlider,
    Banner
} from './index'
import { Announcement } from '@/utils/api/Announcement'
import { Category } from '@/utils/api/Category'
import type { AnnouncementResource } from '@/utils/api/types'
import { LoadStatus } from './types'
import { API_SETTINGS } from '@/config/General'
import type { CategoryWithInterestResource } from '@/utils/api/types'
import type { AnnouncementRequest } from '@/utils/api/types'

const announcement = new Announcement()
const category = new Category()
const CATEGORY_DEFAULT_PAGINATION = 4

export function MainPage() {
    const [announcements, setAnnouncements] = useState<AnnouncementResource[]>([])
    const [categories, setCategories] = useState<CategoryWithInterestResource[]>([])
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

    useEffect(() => {
        async function getCategories() {
            const data: CategoryWithInterestResource[] = await category.getCategories({
                take: CATEGORY_DEFAULT_PAGINATION, 
                skip: 0
            })  
            setCategories(data)
        }
        getCategories()
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
            <AnnouncementSlider announcements={announcements} loadStatus={loadStatus} />
            <section className="friends">
                <div className="container">
                    <div className="row">
                        <InterestBlock categories={categories} />
                    </div>
                </div>
            </section>
        </>
    )
}
