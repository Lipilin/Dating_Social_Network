import type { Post as PostResource, PostRequest } from './types'
import { API_SETTINGS } from '@/config/General'
import axios from 'axios'

export class Post{
    #abortController: AbortController = new AbortController()

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
        this.#abortController.abort()
        this.#abortController = new AbortController()
        try{
            const response = await axios.get<PostResource[]>(
                `${API_SETTINGS.API_HOST}${API_SETTINGS.ENDPOINTS.POST.LIST}`, 
                { 
                    params: request, 
                    signal: this.#abortController.signal,
                }, 
            )
            return response.data
        }catch(error){
            console.log((error as Error).message)
            throw error
        }
    }
}