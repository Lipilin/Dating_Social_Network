import { prisma } from '@/prisma.js'

export class CategoryService{

    async getCategories(pagination: number){
        const categories = await prisma.category.findMany(
            { 
                include:{
                    interests: true
                }, 
                take: pagination
            }
        )
        return categories
    }

}