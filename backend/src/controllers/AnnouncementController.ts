import { ANNOUNCEMENT_ERROR_MESSAGE, ANNOUNCEMENT_SUCCESS_MESSAGE } from "@/config/announcementMessages.js"
import { AnnouncementService } from "@/services/AnnouncementService.js"
import type { Request, Response } from "express"
import { API_RESPONSE } from "@/types.js"
import { AnnouncementCreateSchema, getValidationErrorMessage } from "@/utils/validation/rules.js"
import { Prisma } from "@prisma/client"
import { GenderPreference } from "@prisma/client"
import {
    fromAnnouncementRequestBodyToAnnouncementResource,
    fromAnnouncementResourceToCreateInput,
    fromAnnouncementToResource,
} from '@/utils/mapping/announcement.mapper.js'
import {
    getUploadedFile,
    saveUploadedPhoto,
} from '@/utils/multer/saveUploadedPhoto.js'

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
        if (purpose) {
            const purposes = Array.isArray(purpose) ? purpose : [purpose]
            purposes.forEach((item) => {
                if (typeof item === 'object' && item !== null && 'id' in item) {
                    const id = Number((item as { id: unknown }).id)
                    if (!Number.isNaN(id)) interestsId.push(id)
                }
            })
        }

        try{
            const entites = await this.#annoucementProvider.getAnnouncements(take, skip, clauses, interestsId)
            response.status(API_RESPONSE.OK).json(entites.map(fromAnnouncementToResource))
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
            if (!entity) {
                return response.status(API_RESPONSE.OK).json(null)
            }
            response.status(API_RESPONSE.OK).json(fromAnnouncementToResource(entity))
        }catch(error){
            response.status(API_RESPONSE.ERROR).json({
                message: (error as Error).message,
            })
        }
    }

    async createAnnouncement(request: Request, response: Response) {
        const announcementResource = fromAnnouncementRequestBodyToAnnouncementResource(request.body)
        const validation = AnnouncementCreateSchema.safeParse(
            fromAnnouncementResourceToCreateInput(announcementResource),
        )

        if (validation.error) {
            return response.status(API_RESPONSE.BAD_REQUEST).json({
                message: getValidationErrorMessage(validation.error, ANNOUNCEMENT_ERROR_MESSAGE.VALIDATION),
            })
        }

        try {
            const announcement = await this.#annoucementProvider.createAnnouncement(
                request.authorizedUserId as number,
                validation.data,
            )
            const file = getUploadedFile(request, 'file')

            if (file) {
                const icon = await saveUploadedPhoto(file, 'announcements', announcement.id, 'file')
                await this.#annoucementProvider.updateAnnouncementIcon(announcement.id, icon)
            }

            response.status(API_RESPONSE.OK).json({
                message: ANNOUNCEMENT_SUCCESS_MESSAGE.CREATE,
            })
        } catch (error) {
            response.status(API_RESPONSE.ERROR).json({
                message: (error as Error).message || ANNOUNCEMENT_ERROR_MESSAGE.CREATE,
            })
        }
    }

    async updateAnnouncement(request: Request, response: Response) {
        const announcementResource = fromAnnouncementRequestBodyToAnnouncementResource(request.body)

        if (!announcementResource.id || Number.isNaN(announcementResource.id)) {
            return response.status(API_RESPONSE.BAD_REQUEST).json({
                message: ANNOUNCEMENT_ERROR_MESSAGE.NOT_FOUND,
            })
        }

        const validation = AnnouncementCreateSchema.safeParse(
            fromAnnouncementResourceToCreateInput(announcementResource),
        )

        if (validation.error) {
            return response.status(API_RESPONSE.BAD_REQUEST).json({
                message: getValidationErrorMessage(validation.error, ANNOUNCEMENT_ERROR_MESSAGE.VALIDATION),
            })
        }

        try {
            const announcement = await this.#annoucementProvider.updateAnnouncement(
                request.authorizedUserId as number,
                announcementResource.id,
                validation.data,
            )
            const file = getUploadedFile(request, 'file')

            if (file) {
                const icon = await saveUploadedPhoto(file, 'announcements', announcement.id, 'file')
                await this.#annoucementProvider.updateAnnouncementIcon(announcement.id, icon)
            }

            response.status(API_RESPONSE.OK).json({
                message: ANNOUNCEMENT_SUCCESS_MESSAGE.UPDATE,
            })
        } catch (error) {
            response.status(API_RESPONSE.ERROR).json({
                message: (error as Error).message || ANNOUNCEMENT_ERROR_MESSAGE.UPDATE,
            })
        }
    }

    async deleteAnnouncement(request: Request, response: Response) {
        const id = Number(request.body?.id)

        if (!id || Number.isNaN(id)) {
            return response.status(API_RESPONSE.BAD_REQUEST).json({
                message: ANNOUNCEMENT_ERROR_MESSAGE.MISSING_ANNOUNCEMENT_ID,
            })
        }

        try {
            await this.#annoucementProvider.deleteAnnouncement(request.authorizedUserId as number, id)
            response.status(API_RESPONSE.OK).json({
                message: ANNOUNCEMENT_SUCCESS_MESSAGE.DELETE,
            })
        } catch (error) {
            response.status(API_RESPONSE.ERROR).json({
                message: (error as Error).message || ANNOUNCEMENT_ERROR_MESSAGE.DELETE,
            })
        }
    }
}
