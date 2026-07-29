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

const announcement = new Announcement()
const category = new Category()

export function MainPage() {
    const [ announcements, setAnnouncements ] = useState<AnnouncementResource[]>([])
    const [ loadStatus, setLoadStatus ] = useState<LoadStatus>(LoadStatus.LOADING)
    useEffect(()=>{
        async function getAnnouncements(){
            const data: AnnouncementResource[] = await announcement.getLast({
                pagination: API_SETTINGS.DEFAULT_PAGINATION
            })
            setAnnouncements(data)
            setLoadStatus(LoadStatus.READY)
        }
        getAnnouncements()
    }, [])
    const setData = useCallback(async (data: any) => {
        setLoadStatus(LoadStatus.LOADING)
        const response: AnnouncementResource[] = await announcement.getDataWithClauses({
            pagination: API_SETTINGS.DEFAULT_PAGINATION
        })
        setAnnouncements(response)
        setLoadStatus(LoadStatus.READY)
    }, [])
    return (
        <div className='wrapper'>
            <div className='main__sections'>
                <main className='main'>
                    <Banner />
                    <SearchForm loadStatus={ loadStatus } setData={ setData }/>
                    <AnnouncementSlider announcements={ announcements } loadStatus={ loadStatus }/>
                    <section className="friends">
                        <div className="container">
                            <div className="row">
                                <InterestBlock dataProvider={ category }/>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}