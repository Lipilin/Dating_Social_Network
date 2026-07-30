import { AnnouncementService } from "@/services/AnnouncementService.js"
import type { Request, Response } from "express"
import { API_RESPONSE } from "@/types.js"

export class AnnouncementController{
    #annoucementProvider: AnnouncementService 

    constructor(announcementProvider: AnnouncementService){
        this.#annoucementProvider = announcementProvider
    }

    async getLastAnnouncements(request: Request, response: Response){
        const pagination = Number(request?.query?.pagination)
        if(!pagination){
            return response.status(API_RESPONSE.BAD_REQUEST).json([])
        }
        try{
            const entites = await this.#annoucementProvider.getAnnouncements(pagination)
            response.status(API_RESPONSE.OK).json(entites)
        }catch(error){
            response.status(API_RESPONSE.ERROR).json([])
        }
    }
}