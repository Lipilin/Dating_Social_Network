import type { Page as PageResource, PageRequest } from './types'
import { API_SETTINGS } from '@/config/General'
import axios from 'axios'

export class Page {
    async getByAlias(alias: string): Promise<PageResource | null> {
        try {
            const response = await axios.get<PageResource>(
                `${API_SETTINGS.API_HOST}${API_SETTINGS.ENDPOINTS.PAGE.GET}`,
                {
                    params: { alias },
                }
            )
            return response.data
        } catch (error) {
            return null
        }
    }

    async listPages(request: PageRequest): Promise<PageResource[]> {
        try {
            const response = await axios.get<PageResource[]>(
                `${API_SETTINGS.API_HOST}${API_SETTINGS.ENDPOINTS.PAGE.LIST}`,
                { params: request }
            )
            return response.data
        } catch (error) {
            return []
        }
    }
}
