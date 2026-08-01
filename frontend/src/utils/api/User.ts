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
}