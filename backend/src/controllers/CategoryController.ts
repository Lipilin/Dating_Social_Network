import type { CategoryService } from '@/services/CategoryService.js'
import type { Request, Response } from 'express'

export class CategoryController{
    #categoryService: CategoryService

    constructor(service: CategoryService){
        this.#categoryService = service
    }

    async listCategories(request: Request, response: Response){
        const categories = await this.#categoryService.getCategoriesWithInterests()
        response.json({ entities: categories })
    }
}