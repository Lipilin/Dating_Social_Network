import type { Request, Response, NextFunction } from "express"
import { jwtVerify } from 'jose'
import { ACCESS_TOKEN_COOKIE_NAME, API_RESPONSE, type JwtFormat, AUTH_ERROR_MESSAGE } from "@/types.js"
import { encodedAccessSecret } from '@/utils/other/authSecret.js'

export async function authMiddleware(req: Request, res: Response, next: NextFunction){
    const token = req.cookies?.[ACCESS_TOKEN_COOKIE_NAME]
    if(!token){
        return res.status(API_RESPONSE.UNAUTHORIZED).json({ message: "Unauthorized" })
    }
    try{
        const { payload } = await jwtVerify<JwtFormat>(token, encodedAccessSecret)
        req.authorizedUserId = payload.id
        req.rememberMe = payload.rememberMe
    } catch (error) {
        return res.status(API_RESPONSE.UNAUTHORIZED).json({ message: (error as Error).message })
    }
    next()
}