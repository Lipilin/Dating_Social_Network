import type { CategoryService } from '@/services/CategoryService.js'
import type { Request, Response } from 'express'
import { API_RESPONSE } from '@/types.js'

export class CategoryController{
    #categoryService: CategoryService

    constructor(service: CategoryService){
        this.#categoryService = service
    }

    async listCategories(request: Request, response: Response){
        const take = Number(request?.query.take)
        const skip = Number(request?.query.skip) || 0
        if(!take){
            return response.status(API_RESPONSE.BAD_REQUEST).json({})
        }

        try{
            const entities = await this.#categoryService.getCategories(take, skip)
            response.status(API_RESPONSE.OK).json(entities)
        }catch(error){
            response.status(API_RESPONSE.ERROR).json({
                message: (error as Error).message,
            })
        }
    }   
}