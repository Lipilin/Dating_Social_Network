import type { AnnouncementResource } from './types'

export class Announcement{

    async getLast(): Promise<AnnouncementResource[]>{
        return []
    }

    async getPopular(): Promise<AnnouncementResource[]>{
        return []
    }

    async getDataWithClauses(): Promise<AnnouncementResource[]>{
        return []
    }

    async createAnouncement(): Promise<void>{

    }
}