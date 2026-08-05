import { prisma } from "@/prisma.js"
import type { Announcement, Prisma } from "@prisma/client"
import { UserContentStatus } from "@prisma/client"

export class AnnouncementService{
    async getAnnouncements(take: number, skip: number, clauses: Prisma.AnnouncementWhereInput, interestsId: string[]): Promise<Announcement[]>{
        if(interestsId.length > 0) {
            clauses.interests = {
                some: {
                    id: { in: interestsId }
                }
            }
        }
        const response = await prisma.announcement.findMany({
            orderBy: {
                createdAt: 'desc'
            }, 
            where: {
                status: UserContentStatus.PUBLISHED, 
                ...clauses
            },
            include: {
                user: true,
            }, 
            take: take, 
            skip: skip, 
        })
        return response
    }

    async getAnnouncementById(id: string): Promise<Announcement | null>{
        const response = await prisma.announcement.findUnique({
            where: {
                id: id
            }, 
            include: {
                user: true,
                interests: true,
            }
        })
        return response
    }
}