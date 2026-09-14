import { POST_ERROR_MESSAGE, POST_SUCCESS_MESSAGE } from "@/config/postMessages.js"
import { PostService } from "@/services/PostService.js"
import type { Request, Response } from "express"
import { API_RESPONSE } from "@/types.js"
import { CreatePostSchema, getValidationErrorMessage } from "@/utils/validation/rules.js"
import { fromPostRequestBodyToPostResource, fromPostResourceToCreateInput } from '@/utils/mapping/post.mapper.js'
import {
    getUploadedFile,
    saveUploadedPhoto,
} from '@/utils/multer/saveUploadedPhoto.js'

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
        const postResource = fromPostRequestBodyToPostResource(request.body)
        const validation = CreatePostSchema.safeParse(fromPostResourceToCreateInput(postResource))

        if (validation.error) {
            return response.status(API_RESPONSE.BAD_REQUEST).json({
                message: getValidationErrorMessage(validation.error, POST_ERROR_MESSAGE.VALIDATION),
            })
        }

        try {
            const post = await this.#postProvider.createPost(
                request.authorizedUserId as number,
                validation.data,
            )
            const file = getUploadedFile(request, 'file')

            if (file) {
                const image = await saveUploadedPhoto(file, 'posts', post.id, 'file')
                await this.#postProvider.updatePostImage(post.id, image)
            }

            response.status(API_RESPONSE.OK).json({
                message: POST_SUCCESS_MESSAGE.CREATE,
            })
        } catch (error) {
            response.status(API_RESPONSE.ERROR).json({
                message: (error as Error).message || POST_ERROR_MESSAGE.CREATE,
            })
        }
    }

    async updatePost(request: Request, response: Response) {
        const postResource = fromPostRequestBodyToPostResource(request.body)

        if (!postResource.id || Number.isNaN(postResource.id)) {
            return response.status(API_RESPONSE.BAD_REQUEST).json({
                message: POST_ERROR_MESSAGE.NOT_FOUND,
            })
        }

        const validation = CreatePostSchema.safeParse(fromPostResourceToCreateInput(postResource))

        if (validation.error) {
            return response.status(API_RESPONSE.BAD_REQUEST).json({
                message: getValidationErrorMessage(validation.error, POST_ERROR_MESSAGE.VALIDATION),
            })
        }

        try {
            const post = await this.#postProvider.updatePost(
                request.authorizedUserId as number,
                postResource.id,
                validation.data,
            )
            const file = getUploadedFile(request, 'file')

            if (file) {
                const image = await saveUploadedPhoto(file, 'posts', post.id, 'file')
                await this.#postProvider.updatePostImage(post.id, image)
            }

            response.status(API_RESPONSE.OK).json({
                message: POST_SUCCESS_MESSAGE.UPDATE,
            })
        } catch (error) {
            response.status(API_RESPONSE.ERROR).json({
                message: (error as Error).message || POST_ERROR_MESSAGE.UPDATE,
            })
        }
    }

    async deletePost(request: Request, response: Response) {
        const id = Number(request.body?.id)

        if (!id || Number.isNaN(id)) {
            return response.status(API_RESPONSE.BAD_REQUEST).json({
                message: POST_ERROR_MESSAGE.MISSING_POST_ID,
            })
        }

        try {
            await this.#postProvider.deletePost(request.authorizedUserId as number, id)
            response.status(API_RESPONSE.OK).json({
                message: POST_SUCCESS_MESSAGE.DELETE,
            })
        } catch (error) {
            response.status(API_RESPONSE.ERROR).json({
                message: (error as Error).message || POST_ERROR_MESSAGE.DELETE,
            })
        }
    }
}
