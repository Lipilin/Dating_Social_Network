import { prisma } from "@/prisma.js"
import type { Announcement, Prisma } from '@prisma/client'
import { UserContentStatus, UserStatus } from '@prisma/client'

export class AnnouncementService{
    async getAnnouncements(take: number, skip: number, clauses: Prisma.AnnouncementWhereInput, interestsId: number[]): Promise<Announcement[]>{
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
                user: {
                    status: UserStatus.REGISTERED
                }, 
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

    async getAnnouncementById(id: number): Promise<Announcement | null>{
        const response = await prisma.announcement.findUnique({
            where: {
                id: id,
                user: {
                    status: UserStatus.REGISTERED
                }
            }, 
            include: {
                user: true,
                interests: {
                    include: {
                        category: true
                    }
                }
            }
        })
        return response
    }
}