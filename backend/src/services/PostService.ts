import { POST_ERROR_MESSAGE } from "@/config/postMessages.js"
import { prisma } from "@/prisma.js"
import { assertContentOwnership } from "@/utils/other/assertContentOwnership.js"
import type { CreatePostRequest } from "@pick-me-up/common/type.js"
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

    async createPost(userId: number, data: Pick<CreatePostRequest, 'title' | 'content' | 'image' | 'tags'>): Promise<Post> {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
                status: UserStatus.REGISTERED,
            },
        })

        if (!user) {
            throw new Error(POST_ERROR_MESSAGE.USER_NOT_FOUND)
        }

        return prisma.post.create({
            data: {
                title: data.title,
                content: data.content,
                image: data.image || '',
                tags: data.tags ?? [],
                userId,
                status: UserContentStatus.PENDING_APPROVEMENT,
            },
            include: {
                user: true,
            },
        })
    }

    async updatePost(userId: number, id: number, data: Pick<CreatePostRequest, 'title' | 'content' | 'image' | 'tags'>): Promise<Post> {
        const post = await prisma.post.findUnique({
            where: { id },
        })

        assertContentOwnership(
            userId,
            post,
            POST_ERROR_MESSAGE.NOT_FOUND,
            POST_ERROR_MESSAGE.FORBIDDEN,
        )

        return prisma.post.update({
            where: { id },
            data: {
                title: data.title,
                content: data.content,
                image: data.image || '',
                tags: data.tags ?? [],
                status: UserContentStatus.PENDING_APPROVEMENT,
            },
            include: {
                user: true,
            },
        })
    }

    async updatePostImage(id: number, image: string): Promise<Post> {
        return prisma.post.update({
            where: { id },
            data: { image },
        })
    }

    async deletePost(userId: number, id: number): Promise<void> {
        const post = await prisma.post.findUnique({
            where: { id },
        })

        assertContentOwnership(
            userId,
            post,
            POST_ERROR_MESSAGE.NOT_FOUND,
            POST_ERROR_MESSAGE.FORBIDDEN,
        )

        await prisma.post.delete({
            where: { id },
        })
    }
}
