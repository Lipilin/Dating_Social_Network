import type { CategoryService } from '@/services/CategoryService.js'
import type { Request, Response } from 'express'
import { API_RESPONSE } from '@/types.js'

export class CategoryController{
    #categoryService: CategoryService

    constructor(service: CategoryService){
        this.#categoryService = service
    }

    async listCategories(request: Request, response: Response){

        try{
            const entities = await this.#categoryService.getCategories(request?.query || {})
            response.status(API_RESPONSE.OK).json(entities)
        }catch(error){
            response.status(API_RESPONSE.ERROR).json({
                message: (error as Error).message,
            })
        }
    }   
}