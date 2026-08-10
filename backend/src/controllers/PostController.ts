import { PostService } from "@/services/PostService.js"
import type { Request, Response } from "express"
import { API_RESPONSE } from "@/types.js"

export class PostController {
    #postProvider: PostService

    constructor(postProvider: PostService) {
        this.#postProvider = postProvider
    }

    async listPosts(request: Request, response: Response) {
        const take = Number(request?.query?.take)
        const skip = Number(request?.query?.skip) || 0

        if (!take) {
            return response.status(API_RESPONSE.BAD_REQUEST).json([])
        }

        try {
            const entities = await this.#postProvider.listPosts(take, skip)
            response.status(API_RESPONSE.OK).json(entities)
        } catch (error) {
            response.status(API_RESPONSE.ERROR).json([])
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
            response.status(API_RESPONSE.ERROR).json(null)
        }
    }
}
