import { PageService } from "@/services/PageService.js"
import type { Request, Response } from "express"
import { API_RESPONSE } from "@/types.js"

export class PageController {
    #pageProvider: PageService

    constructor(pageProvider: PageService) {
        this.#pageProvider = pageProvider
    }

    async listPages(request: Request, response: Response) {
        const take = Number(request?.query?.take)
        const skip = Number(request?.query?.skip) || 0

        if (!take) {
            return response.status(API_RESPONSE.BAD_REQUEST).json([])
        }

        try {
            const entities = await this.#pageProvider.listPages(take, skip)
            response.status(API_RESPONSE.OK).json(entities)
        } catch (error) {
            response.status(API_RESPONSE.ERROR).json([])
        }
    }

    async getPageByAlias(request: Request, response: Response) {
        const alias = request?.query?.alias
        if (!alias) return response.status(API_RESPONSE.BAD_REQUEST).json(null)
        try {
            const entity = await this.#pageProvider.getPageByAlias(String(alias))
            response.status(API_RESPONSE.OK).json(entity)
        } catch (error) {
            response.status(API_RESPONSE.ERROR).json(null)
        }
    }
}
