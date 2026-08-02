import axios from 'axios'
import type { UserResource } from './types'

export class User{
    async getInfo(){

    }

    async auth(){

    }

    async updateRefreshToken(){

    }

    async getProfile(): Promise<UserResource | null>{
        return null
    }

    async createUser(request: any): Promise<UserResource | null>{
        try{
            const response = await axios.post('****/user/create', request)
            return response.data as UserResource
        } catch (error) {
            console.error(error)
            return null
        }
    }
}