import { prisma } from '@/prisma.js'

export class CategoryService{

    async getCategories(take: number, skip: number){
        const categories = await prisma.category.findMany(
            { 
                include:{
                    interests: true
                }, 
                take: take, 
                skip: skip
            }
        )
        return categories
    }

}