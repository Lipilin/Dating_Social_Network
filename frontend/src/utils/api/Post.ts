import type { Post as PostResource, PostRequest } from './types'
import { API_SETTINGS } from '@/config/General'
import axios from 'axios'

export class Post{
    async getPost(id: number): Promise<PostResource | null> {
        try{
            const response = await axios.get<PostResource>(
                `${API_SETTINGS.API_HOST}${API_SETTINGS.ENDPOINTS.POST.GET}`, 
                {
                    params: { id: id }
                }
            )
            return response.data
        }catch(error){
            return null
        }
    }

    async listPost(request: PostRequest): Promise<PostResource[]> {
        try{
            const response = await axios.get<PostResource[]>(
                `${API_SETTINGS.API_HOST}${API_SETTINGS.ENDPOINTS.POST.LIST}`, 
                { params: request }
            )
            return response.data
        }catch(error){
            return []
        }
    }
}