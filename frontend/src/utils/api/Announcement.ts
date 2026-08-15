import type { AnnouncementRequest, AnnouncementResource } from './types'
import { API_SETTINGS } from '@/config/General'
import axios from 'axios'

export class Announcement{
    #abortController: AbortController = new AbortController()
    #abortCreateController: AbortController = new AbortController()

    async getLast(request: AnnouncementRequest): Promise<AnnouncementResource[]>{
        return this.getDataWithClauses(request)
    }

    async getPopular(): Promise<AnnouncementResource[]>{
        return []
    }

    async getDataWithClauses(request: AnnouncementRequest): Promise<AnnouncementResource[]>{
        this.#abortController.abort()
        this.#abortController = new AbortController()
        try{
            const result = await axios.get<AnnouncementResource[]>(
                `${ API_SETTINGS.API_HOST }${ API_SETTINGS.ENDPOINTS.ANNOUNCEMENT.LIST }`, 
                {
                    params: request
                }
            )
            const data = result.data
            return data
        }catch(error){
            console.log((error as Error).message)
            return []
        }
    }

    async createAnouncement(): Promise<void>{
        this.#abortCreateController.abort()
        this.#abortCreateController = new AbortController()
    }

    async getById(id: number): Promise<AnnouncementResource | null>{
        try{
            const result = await axios.get(
                `${ API_SETTINGS.API_HOST }${ API_SETTINGS.ENDPOINTS.ANNOUNCEMENT.GET }`, 
                {
                    params: {id: id}
                }
            )
            const data = result.data as AnnouncementResource
            return data
        }catch(error){
            console.log((error as Error).message)
            return null
        }
    }
}