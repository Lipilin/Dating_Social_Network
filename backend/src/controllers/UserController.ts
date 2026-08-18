import type { UserService } from '@/services/UserService.js'
import type { Request } from 'express'
import type { Response } from 'express'
import {
    ACCESS_TOKEN_COOKIE_MAX_AGE,
    ACCESS_TOKEN_COOKIE_NAME,
    ACCESS_TOKEN_EXPIRATION_TIME,
    API_RESPONSE,
    AUTH_ERROR_MESSAGE,
    AUTH_SUCCESS_MESSAGE,
    REFRESH_TOKEN_COOKIE_NAME,
    REFRESH_TOKEN_COOKIE_MAX_AGE,
    REFRESH_TOKEN_EXPIRATION_TIME,
} from '@/types.js'
import { LoginStepSchema, InfoStepSchema, UserLoginSchema } from '@/utils/validation/rules.js'
import type { UserLoginRequest, UserLoginResponse, UserPostRequest } from '@boltaem/common/type.js'
import type { RefreshTokenService } from '@/services/RefreshTokenService.js'
import { generateJwtToken } from '@/utils/mapping/user.mapper.js'
import { encodedAccessSecret, encodedRefreshSecret } from '@/utils/other/authSecret.js'


export class UserController{
    #userService: UserService
    #refreshTokenService: RefreshTokenService

    constructor(userSerivce: UserService, refreshTokenService: RefreshTokenService){
        this.#userService = userSerivce
        this.#refreshTokenService = refreshTokenService
    }

    #sendAuthResponse(res: Response, user: Pick<UserLoginResponse, 'accessToken' | 'refreshToken'>){
        res.cookie(ACCESS_TOKEN_COOKIE_NAME, user.accessToken, {
            httpOnly: true,
            maxAge: ACCESS_TOKEN_COOKIE_MAX_AGE,
        })
        res.cookie(REFRESH_TOKEN_COOKIE_NAME, user.refreshToken, {
            httpOnly: true,
            maxAge: REFRESH_TOKEN_COOKIE_MAX_AGE,
        })
        return res.status(API_RESPONSE.OK).json(user)
    }

    register = async(req: Request, res: Response) => {
        const userRequest: UserPostRequest = req.body
        if(LoginStepSchema.safeParse(userRequest).error){
            return res.status(API_RESPONSE.BAD_REQUEST).json(null)
        }
        if(InfoStepSchema.safeParse(userRequest).error){
            return res.status(API_RESPONSE.BAD_REQUEST).json(null)
        }
        try{
            const user = await this.#userService?.createUser(userRequest)
            return res.status(API_RESPONSE.OK).json(user)
        }catch(error){
            console.error(error)
            return res.status(API_RESPONSE.ERROR).json({
                message: (error as Error).message,
            })
        }
    }

    login = async(req: Request, res: Response) => {
        const userRequest: UserLoginRequest = req.body
        const validation = UserLoginSchema.safeParse(userRequest)
        if(validation.error){
            return res.status(API_RESPONSE.BAD_REQUEST).json({
                message: validation.error.message,
            })
        }
        try{
            const user = await this.#userService.login(userRequest)
            if(!user) return res.status(API_RESPONSE.ERROR).json({})
            await this.#refreshTokenService.create({ id: user.user.id }, user.refreshToken)
            return this.#sendAuthResponse(res, user)
        }catch(error){
            return res.status(API_RESPONSE.ERROR).json({
                message: (error as Error).message,
            })
        }
    }

    me = async(req: Request, res: Response) => {
        try{
            const user = await this.#userService.me(req.authorizedUserId as number)
            return res.status(API_RESPONSE.OK).json(user)
        }catch(error){
            return res.status(API_RESPONSE.ERROR).json({
                message: (error as Error).message,
            })
        }
    }

    refresh = async(req: Request, res: Response) => {
        const refreshToken = req.cookies?.[REFRESH_TOKEN_COOKIE_NAME]
        if(!refreshToken) return res.status(API_RESPONSE.UNAUTHORIZED).json({
            message: AUTH_ERROR_MESSAGE.NO_TOKEN_PROVIDED,
        })
        try{
            const token = await this.#refreshTokenService.get(refreshToken)
            if(token == null){
                return res.status(API_RESPONSE.UNAUTHORIZED).json({
                    message: AUTH_ERROR_MESSAGE.NO_TOKEN_PROVIDED,
                })
            }
            const accessToken = await generateJwtToken(token.user, encodedAccessSecret, ACCESS_TOKEN_EXPIRATION_TIME)
            const newRefreshToken = await generateJwtToken(token.user, encodedRefreshSecret, REFRESH_TOKEN_EXPIRATION_TIME)
            await this.#refreshTokenService.create({ id: token.user.id }, newRefreshToken)
            return this.#sendAuthResponse(res, {
                accessToken,
                refreshToken: newRefreshToken,
            })
        }catch(error){
            return res.status(API_RESPONSE.ERROR).json({
                message: (error as Error).message,
            })
        }
    }

    list = async(req: Request, res: Response) => {
        const { id } = req.query
        if(!id) return res.status(API_RESPONSE.BAD_REQUEST).json({})

        const numericId = Number(id)
        if(Number.isNaN(numericId)) return res.status(API_RESPONSE.BAD_REQUEST).json({})

        const entity = await this.#userService.getUser(numericId)
        if(!entity) return res.status(API_RESPONSE.NOT_FOUND).json({})
        res.status(API_RESPONSE.OK).json(entity)
    }        

    logout = async(req: Request, res: Response) => {
        res.clearCookie(ACCESS_TOKEN_COOKIE_NAME)
        res.clearCookie(REFRESH_TOKEN_COOKIE_NAME)
        return res.status(API_RESPONSE.OK).json({
            message: AUTH_SUCCESS_MESSAGE.LOGOUT,
            user: null, 
        })
    }

    update = async(req: Request, res: Response) => {
        
    }
}
