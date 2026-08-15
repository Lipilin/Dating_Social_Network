import axios from 'axios'
import type { UserResource } from './types'
import type { UserPostRequest } from './types'
import { API_SETTINGS } from '@/config/General'

export class User{
    async getInfo(){

    }

    async auth(){

    }

    async updateRefreshToken(){

    }

    async getProfile(id: number): Promise<UserResource | null>{
        try{
            const response = await axios.get(
                `${ API_SETTINGS.API_HOST }${ API_SETTINGS.ENDPOINTS.USER.LIST }?id=${ id }`
            )
            return response.data as UserResource
        } catch (error) {
            console.error(error)
            return null
        }
    }

    async createUser(request: UserPostRequest): Promise<UserResource | null>{
        try{
            const response = await axios.post(
                `${ API_SETTINGS.API_HOST }${ API_SETTINGS.ENDPOINTS.USER.CREATE }`, 
                request
            )
            return response.data as UserResource
        } catch (error) {
            console.error(error)
            return null
        }
    }

    async getMe(): Promise<UserResource | null>{
        return null
    }

}