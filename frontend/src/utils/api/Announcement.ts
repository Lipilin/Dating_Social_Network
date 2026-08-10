import type { AnnouncementRequest, AnnouncementResource } from './types'
import { API_SETTINGS } from '@/config/General'
import axios from 'axios'

export class Announcement{

    async getLast(request: AnnouncementRequest): Promise<AnnouncementResource[]>{
        try{
            const result = await axios.get(
                `${ API_SETTINGS.API_HOST }${ API_SETTINGS.ENDPOINTS.ANNOUNCEMENT.LIST }`, 
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
        try{
            const result = await axios.get(
                `${ API_SETTINGS.API_HOST }${ API_SETTINGS.ENDPOINTS.ANNOUNCEMENT.LIST }`, 
                {
                    params: request
                }
            )
            const data = result.data as AnnouncementResource[]
            return data
        }catch(error){
            console.log((error as Error).message)
            return []
        }
    }

    async createAnouncement(): Promise<void>{

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