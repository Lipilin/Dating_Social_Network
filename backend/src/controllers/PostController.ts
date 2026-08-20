import { POST_ERROR_MESSAGE, POST_SUCCESS_MESSAGE } from "@/config/postMessages.js"
import { PostService } from "@/services/PostService.js"
import type { Request, Response } from "express"
import { API_RESPONSE } from "@/types.js"
import { CreatePostSchema, getValidationErrorMessage } from "@/utils/validation/rules.js"
import type { CreatePostRequest } from "@boltaem/common/type.js"

export class PostController {
    #postProvider: PostService

    constructor(postProvider: PostService) {
        this.#postProvider = postProvider
    }

    async listPosts(request: Request, response: Response) {
        const take = Number(request?.query?.take)
        const skip = Number(request?.query?.skip) || 0

        if (!take) {
            return response.status(API_RESPONSE.BAD_REQUEST).json({})
        }

        try {
            const entities = await this.#postProvider.listPosts(take, skip)
            response.status(API_RESPONSE.OK).json(entities)
        } catch (error) {
            response.status(API_RESPONSE.ERROR).json({
                message: (error as Error).message,
            })
        }
    }

    async getPostById(request: Request, response: Response) {
        const id = request?.query?.id
        if (!id) return response.status(API_RESPONSE.BAD_REQUEST).json(null)

        const numericId = Number(id)
        if (Number.isNaN(numericId)) return response.status(API_RESPONSE.BAD_REQUEST).json(null)

        try {
            const entity = await this.#postProvider.getPostById(numericId)
            response.status(API_RESPONSE.OK).json(entity)
        } catch (error) {
            response.status(API_RESPONSE.ERROR).json({
                message: (error as Error).message,
            })
        }
    }

    async createPost(request: Request, response: Response) {
        const postRequest: CreatePostRequest = request.body
        const validation = CreatePostSchema.safeParse(postRequest)

        if (validation.error) {
            return response.status(API_RESPONSE.BAD_REQUEST).json({
                message: getValidationErrorMessage(validation.error, POST_ERROR_MESSAGE.VALIDATION),
            })
        }

        try {
            await this.#postProvider.createPost(request.authorizedUserId as number, validation.data)
            response.status(API_RESPONSE.OK).json({
                message: POST_SUCCESS_MESSAGE.CREATE,
            })
        } catch (error) {
            response.status(API_RESPONSE.ERROR).json({
                message: (error as Error).message || POST_ERROR_MESSAGE.CREATE,
            })
        }
    }
}
