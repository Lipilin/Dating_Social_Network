import { prisma } from '@/prisma.js'
import type { RefreshToken, User } from '@prisma/client'
import { REFRESH_TOKEN_COOKIE_MAX_AGE, REFRESH_TOKEN_REMEMBER_ME_EXPIRATION_TIME } from '@/types.js'
import type { RefreshTokenWithUser } from '@/types.js'

export class RefreshTokenService{

    async get(token: string): Promise<RefreshTokenWithUser | null>{
        try{
            const entity = await prisma.refreshToken.findUnique({
                where: { token },
                include: {
                    user: true,
                },
            })
            if(!entity) return null
            if(entity.expiredAt < new Date()) return null
            return entity
        } catch (error) {
            console.error(error)
            return null
        }
    }

    async create(user: {id: number}, token: string, rememberMe: boolean): Promise<RefreshToken | null>{
        const expiredAt = rememberMe 
            ? new Date(Date.now() + REFRESH_TOKEN_REMEMBER_ME_EXPIRATION_TIME) 
            : new Date(Date.now() + REFRESH_TOKEN_COOKIE_MAX_AGE)   
        try{
            const entity = await prisma.refreshToken.create({
                data: {
                    token,
                    expiredAt: new Date(Date.now() + REFRESH_TOKEN_COOKIE_MAX_AGE),
                    user: {
                        connect: { id: user.id },
                    },
                },
            })
            return entity
        } catch (error) {
            console.error(error)
            return null
        }
    }
}
