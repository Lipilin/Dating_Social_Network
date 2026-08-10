import { prisma } from "@/prisma.js"
import type { Post, Prisma } from "@prisma/client"
import { UserContentStatus, UserStatus } from "@prisma/client"

export class PostService {
    async listPosts(take: number, skip: number, clauses: Prisma.PostWhereInput = {}): Promise<Post[]> {
        const response = await prisma.post.findMany({
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

    async getPostById(id: number): Promise<Post | null> {
        const response = await prisma.post.findUnique({
            where: {
                id: id,
                user: {
                    status: UserStatus.REGISTERED
                }
            },
            include: {
                user: true,
            }
        })
        return response
    }
}
