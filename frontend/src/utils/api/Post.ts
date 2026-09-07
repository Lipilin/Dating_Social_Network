import type { CreatePostRequest, CreatePostResponse, Post as PostResource, PostRequest, UpdatePostResponse } from './types'
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
        const payload = request.imageFile instanceof File
            ? this.#buildPostFormData(undefined, request)
            : request

        try {
            const response = await axios.post<CreatePostResponse>(
                `${API_SETTINGS.API_HOST}${API_SETTINGS.ENDPOINTS.POST.CREATE}`,
                payload,
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

    async updatePost(id: number, request: CreatePostRequest): Promise<UpdatePostResponse> {
        const payload = request.imageFile instanceof File
            ? this.#buildPostFormData(id, request)
            : { id, ...request }

        try {
            const response = await axios.patch<UpdatePostResponse>(
                `${API_SETTINGS.API_HOST}${API_SETTINGS.ENDPOINTS.POST.UPDATE}`,
                payload,
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

    #buildPostFormData(id: number | undefined, request: CreatePostRequest): FormData {
        const { imageFile, ...postData } = request
        const formData = new FormData()
        formData.append('post', JSON.stringify(id != null ? { ...postData, id } : postData))

        if (imageFile instanceof File) {
            formData.append('imageFile', imageFile)
        }

        return formData
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
