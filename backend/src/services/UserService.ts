import { prisma } from '@/prisma.js'
import type { User } from '@prisma/client'
import { UserStatus } from '@prisma/client'

export class UserService{
    async getUser(id: string): Promise<User | null>{
        try{
            const entity = await prisma.user.findUnique({
                where: { id, status: UserStatus.REGISTERED }, 
                include: {
                    posts: true,
                    announcements: true,
                    interests: {
                        include: {
                            category: true
                        }
                    },
                }
            })
            return entity
        } catch (error) {
            console.error(error)
            return null
        }
    }
}