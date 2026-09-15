import type {
    AnnouncementCreateRequest,
    AnnouncementCreateResponse,
    AnnouncementDeleteRequest,
    AnnouncementRequest,
    AnnouncementResource,
    AnnouncementUpdateResponse,
    DeleteResponse,
} from './types'
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

        const payload = request.file instanceof File
            ? this.#buildAnnouncementFormData(undefined, request)
            : request

        try {
            const response = await axios.post<AnnouncementCreateResponse>(
                `${API_SETTINGS.API_HOST}${API_SETTINGS.ENDPOINTS.ANNOUNCEMENT.CREATE}`,
                payload,
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

        const payload = request.file instanceof File
            ? this.#buildAnnouncementFormData(id, request)
            : { id, ...request }

        try {
            const response = await axios.patch<AnnouncementUpdateResponse>(
                `${API_SETTINGS.API_HOST}${API_SETTINGS.ENDPOINTS.ANNOUNCEMENT.UPDATE}`,
                payload,
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

    #buildAnnouncementFormData(id: number | undefined, request: AnnouncementCreateRequest): FormData {
        const { file, ...announcementData } = request
        const formData = new FormData()
        formData.append(
            'announcement',
            JSON.stringify(id != null ? { ...announcementData, id } : announcementData),
        )

        if (file instanceof File) {
            formData.append('file', file)
        }

        return formData
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

    async deleteAnnouncement(request: AnnouncementDeleteRequest): Promise<DeleteResponse> {
        try {
            const response = await axios.delete<DeleteResponse>(
                `${API_SETTINGS.API_HOST}${API_SETTINGS.ENDPOINTS.ANNOUNCEMENT.DELETE}`,
                {
                    data: request,
                    withCredentials: true,
                },
            )
            return response.data
        } catch (error) {
            console.error(error)
            throw error
        }
    }
}
