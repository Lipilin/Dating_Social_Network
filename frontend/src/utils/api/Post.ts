import type { CreatePostRequest, CreatePostResponse, Post as PostResource, PostRequest } from './types'
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

    async createPost(request: CreatePostRequest): Promise<CreatePostResponse> {
        try {
            const response = await axios.post<CreatePostResponse>(
                `${API_SETTINGS.API_HOST}${API_SETTINGS.ENDPOINTS.POST.CREATE}`,
                request,
                {
                    withCredentials: true,
                },
            )
            return response.data
        } catch (error) {
            console.error(error)
            throw error
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