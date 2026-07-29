import type { AnnouncementRequest, AnnouncementResource } from './types'
import { API_SETTINGS } from '@/config/General'
import axios from 'axios'

export class Announcement{
    endpoints: Record<string, string>

    constructor(){
        this.endpoints = {
            list: `${API_SETTINGS.ENDPOINTS.ANNOUNCEMENT.BASE}/${API_SETTINGS.ENDPOINTS.ANNOUNCEMENT.LIST}`
        }
    }

    async getLast(request: AnnouncementRequest): Promise<AnnouncementResource[]>{
        try{
            const result = await axios.get(
                `${API_SETTINGS.API_HOST}/${this.endpoints.list}`, 
                {
                    params: request
                }
            )
            const data = result.data as AnnouncementResource[]
            return data
        }catch (error){
            console.log((error as Error).message)
            return []
        }
    }

    async getPopular(): Promise<AnnouncementResource[]>{
        return []
    }

    async getDataWithClauses(request: AnnouncementRequest): Promise<AnnouncementResource[]>{
        return []
    }

    async createAnouncement(): Promise<void>{

    }
}