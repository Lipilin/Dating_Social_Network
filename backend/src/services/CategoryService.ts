import { prisma } from '@/prisma.js'

export class CategoryService{
    async getCategoriesWithInterests(){
        const categories = await prisma.category.findMany({ include:{
            interests: true
        } })
        return categories
    }
}