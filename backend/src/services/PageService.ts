import { prisma } from "@/prisma.js"
import type { Page, Prisma } from "@prisma/client"

export class PageService {
    async listPages(take: number, skip: number, clauses: Prisma.PageWhereInput = {}): Promise<Page[]> {
        const response = await prisma.page.findMany({
            orderBy: {
                id: 'desc'
            },
            where: {
                ...clauses
            },
            take: take,
            skip: skip,
        })
        return response
    }

    async getPageByAlias(alias: string): Promise<Page | null> {
        const response = await prisma.page.findFirst({
            where: {
                alias: alias,
            }
        })
        return response
    }
}
