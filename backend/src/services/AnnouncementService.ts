import { prisma } from "@/prisma.js"
import type { Announcement } from "@prisma/client"
import { UserContentStatus } from "@prisma/client"

export class AnnouncementService{
    async getAnnouncements(pagination: number): Promise<Announcement[]>{
        const response = await prisma.announcement.findMany({
            orderBy: {
                createdAt: 'desc'
            }, 
            where: {
                status: UserContentStatus.PUBLISHED
            },
            take: pagination
        })
        return response
    }
}