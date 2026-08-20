import { ANNOUNCEMENT_ERROR_MESSAGE, ANNOUNCEMENT_SUCCESS_MESSAGE } from "@/config/announcementMessages.js"
import { AnnouncementService } from "@/services/AnnouncementService.js"
import type { Request, Response } from "express"
import { API_RESPONSE } from "@/types.js"
import { AnnouncementCreateSchema, getValidationErrorMessage } from "@/utils/validation/rules.js"
import type { AnnouncementCreateRequest } from "@boltaem/common/type.js"
import { Prisma } from "@prisma/client"
import { GenderPreference } from "@prisma/client"

export class AnnouncementController{
    #annoucementProvider: AnnouncementService 

    constructor(announcementProvider: AnnouncementService){
        this.#annoucementProvider = announcementProvider
    }

    async getLastAnnouncements(request: Request, response: Response){
        const take = Number(request?.query?.take)
        const skip = Number(request?.query?.skip) || 0
        const { gender, destination, departure, purpose } = request?.query
        const clauses: Prisma.AnnouncementWhereInput = {}
        const interestsId: number[] = []

        if(!take){
            return response.status(API_RESPONSE.BAD_REQUEST).json([])
        }
        if(gender && Object.values(GenderPreference).includes(gender as GenderPreference)){
            clauses.genderInterest = gender as GenderPreference
        }
        if(destination) clauses.destination = String(destination)
        if(departure) clauses.departure = String(departure)
        console.log(purpose)
        if(Array.isArray(purpose)) {
            (purpose as any[]).forEach((purpose) => {
                if(purpose.id) {
                    interestsId.push(Number(purpose.id))
                }
            })
        }

        try{
            const entites = await this.#annoucementProvider.getAnnouncements(take, skip, clauses, interestsId)
            console.error(123)
            response.status(API_RESPONSE.OK).json(entites)
        }catch(error){
            response.status(API_RESPONSE.ERROR).json({
                message: (error as Error).message,
            })
        }
    }

    async getAnnouncementById(request: Request, response: Response){
        const id = request?.query?.id
        if(!id) return response.status(API_RESPONSE.BAD_REQUEST).json(null)

        const numericId = Number(id)
        if(Number.isNaN(numericId)) return response.status(API_RESPONSE.BAD_REQUEST).json(null)

        try{
            const entity = await this.#annoucementProvider.getAnnouncementById(numericId)
            response.status(API_RESPONSE.OK).json(entity)
        }catch(error){
            response.status(API_RESPONSE.ERROR).json({
                message: (error as Error).message,
            })
        }
    }

    async createAnnouncement(request: Request, response: Response) {
        const announcementRequest: AnnouncementCreateRequest = request.body
        const validation = AnnouncementCreateSchema.safeParse(announcementRequest)

        if (validation.error) {
            return response.status(API_RESPONSE.BAD_REQUEST).json({
                message: getValidationErrorMessage(validation.error, ANNOUNCEMENT_ERROR_MESSAGE.VALIDATION),
            })
        }

        try {
            await this.#annoucementProvider.createAnnouncement(request.authorizedUserId as number, validation.data)
            response.status(API_RESPONSE.OK).json({
                message: ANNOUNCEMENT_SUCCESS_MESSAGE.CREATE,
            })
        } catch (error) {
            response.status(API_RESPONSE.ERROR).json({
                message: (error as Error).message || ANNOUNCEMENT_ERROR_MESSAGE.CREATE,
            })
        }
    }
}