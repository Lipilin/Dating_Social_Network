import type { AnnouncementWithRelations } from '@/utils/mapping/announcement.mapper.js'
import { ANNOUNCEMENT_ERROR_MESSAGE } from "@/config/announcementMessages.js"
import { prisma } from "@/prisma.js"
import { assertContentOwnership } from "@/utils/other/assertContentOwnership.js"
import type { AnnouncementCreateRequest } from "@pick-me-up/common/type.js"
import type { Prisma } from '@prisma/client'
import { GenderPreference, UserContentStatus, UserStatus } from '@prisma/client'

export class AnnouncementService{
    async getAnnouncements(take: number, skip: number, clauses: Prisma.AnnouncementWhereInput, interestsId: number[]): Promise<AnnouncementWithRelations[]>{
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

    async getAnnouncementById(id: number): Promise<AnnouncementWithRelations | null>{
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

    async createAnnouncement(userId: number, data: AnnouncementCreateRequest): Promise<AnnouncementWithRelations> {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
                status: UserStatus.REGISTERED,
            },
        })

        if (!user) {
            throw new Error(ANNOUNCEMENT_ERROR_MESSAGE.USER_NOT_FOUND)
        }

        return prisma.announcement.create({
            data: {
                title: data.title,
                departure: data.departure,
                destination: data.destination,
                dateFrom: new Date(data.dateFrom),
                dateTo: new Date(data.dateTo),
                genderInterest: data.genderPreference as GenderPreference,
                description: data.description,
                icon: data.icon || '',
                userId,
                status: UserContentStatus.PENDING_APPROVEMENT,
                interests: {
                    connect: data.interests.map((interest) => ({ id: interest.id })),
                },
            },
            include: {
                user: true,
                interests: {
                    include: {
                        category: true,
                    },
                },
            },
        })
    }

    async updateAnnouncement(userId: number, id: number, data: AnnouncementCreateRequest): Promise<AnnouncementWithRelations> {
        const announcement = await prisma.announcement.findUnique({
            where: { id },
        })

        assertContentOwnership(
            userId,
            announcement,
            ANNOUNCEMENT_ERROR_MESSAGE.NOT_FOUND,
            ANNOUNCEMENT_ERROR_MESSAGE.FORBIDDEN,
        )

        return prisma.announcement.update({
            where: { id },
            data: {
                title: data.title,
                departure: data.departure,
                destination: data.destination,
                dateFrom: new Date(data.dateFrom),
                dateTo: new Date(data.dateTo),
                genderInterest: data.genderPreference as GenderPreference,
                description: data.description,
                icon: data.icon || '',
                status: UserContentStatus.PENDING_APPROVEMENT,
                interests: {
                    set: data.interests.map((interest) => ({ id: interest.id })),
                },
            },
            include: {
                user: true,
                interests: {
                    include: {
                        category: true,
                    },
                },
            },
        })
    }

    async updateAnnouncementIcon(id: number, icon: string): Promise<void> {
        await prisma.announcement.update({
            where: { id },
            data: { icon },
        })
    }

    async deleteAnnouncement(userId: number, id: number): Promise<void> {
        const announcement = await prisma.announcement.findUnique({
            where: { id },
        })

        assertContentOwnership(
            userId,
            announcement,
            ANNOUNCEMENT_ERROR_MESSAGE.NOT_FOUND,
            ANNOUNCEMENT_ERROR_MESSAGE.FORBIDDEN,
        )

        await prisma.announcement.delete({
            where: { id },
        })
    }
}