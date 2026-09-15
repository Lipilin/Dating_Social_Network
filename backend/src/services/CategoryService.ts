import { prisma } from '@/prisma.js'
import type { Request } from '@pick-me-up/common/type.js'

export class CategoryService{

    async getCategories(request: Request){
        if(request.take)request.take = Number(request.take)
        if(request.skip)request.skip = Number(request.skip)
        const categories = await prisma.category.findMany(
            { 
                include:{
                    interests: true
                }, 
                ...request
            }
        )
        return categories
    }

}