import type { CategoryService } from '@/services/CategoryService.js'
import type { Request, Response } from 'express'
import { API_RESPONSE } from '@/types.js'

export class CategoryController{
    #categoryService: CategoryService

    constructor(service: CategoryService){
        this.#categoryService = service
    }

    async listCategories(request: Request, response: Response){
        const pagination = Number(request?.query.pagination)
        if(!pagination){
            return response.status(API_RESPONSE.BAD_REQUEST).json({})
        }

        try{
            const entities = await this.#categoryService.getCategories(pagination)
            response.status(API_RESPONSE.OK).json(entities)
        }catch{
            response.status(API_RESPONSE.ERROR).json([])
        }
    }
}