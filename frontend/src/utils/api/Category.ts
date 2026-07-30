import type { CategoryWithInterestResource, CategoryRequest } from './types'
import { API_SETTINGS } from '@/config/General'
import axios from 'axios'

export class Category {

    async getCategories(request: CategoryRequest): Promise<CategoryWithInterestResource[]>{
        try{
            const result = await axios.get(
                `${API_SETTINGS.API_HOST}${API_SETTINGS.ENDPOINTS.CATEGORIES.LIST}`, 
                {
                    params: request
                }
            )
            return result.data as CategoryWithInterestResource[]
        }catch(error){
            console.log((error as Error).message)
        }
        return []
    }
}