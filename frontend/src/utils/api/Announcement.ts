import type { AnnouncementCreateRequest, AnnouncementCreateResponse, AnnouncementRequest, AnnouncementResource, AnnouncementUpdateResponse } from './types'
import { API_SETTINGS } from '@/config/apiSettings'
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

    async createAnnouncement(request: AnnouncementCreateRequest): Promise<AnnouncementCreateResponse> {
        this.#abortCreateController.abort()
        this.#abortCreateController = new AbortController()
        try {
            const response = await axios.post<AnnouncementCreateResponse>(
                `${API_SETTINGS.API_HOST}${API_SETTINGS.ENDPOINTS.ANNOUNCEMENT.CREATE}`,
                request,
                {
                    withCredentials: true,
                    signal: this.#abortCreateController.signal,
                },
            )
            return response.data
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async updateAnnouncement(id: number, request: AnnouncementCreateRequest): Promise<AnnouncementUpdateResponse> {
        this.#abortCreateController.abort()
        this.#abortCreateController = new AbortController()
        try {
            const response = await axios.patch<AnnouncementUpdateResponse>(
                `${API_SETTINGS.API_HOST}${API_SETTINGS.ENDPOINTS.ANNOUNCEMENT.UPDATE}`,
                { id, ...request },
                {
                    withCredentials: true,
                    signal: this.#abortCreateController.signal,
                },
            )
            return response.data
        } catch (error) {
            console.error(error)
            throw error
        }
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