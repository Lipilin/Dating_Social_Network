import { useState, useEffect, useCallback } from 'react'
import '@/assets/css/main.css'
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
                pagination: API_SETTINGS.DEFAULT_PAGINATION
            })
            setAnnouncements(data)
            setLoadStatus(LoadStatus.READY)
        }
        getAnnouncements()
    }, [])

    useEffect(() => {
        async function getCategories() {
            const data: CategoryWithInterestResource[] = await category.getCategories({
                pagination: CATEGORY_DEFAULT_PAGINATION
            })
            setCategories(data)
        }
        getCategories()
    }, [])

    const setData = useCallback(async (_data: unknown) => {
        setLoadStatus(LoadStatus.LOADING)
        const response: AnnouncementResource[] = await announcement.getDataWithClauses({
            pagination: API_SETTINGS.DEFAULT_PAGINATION
        })
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
