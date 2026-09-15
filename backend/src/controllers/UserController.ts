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
    PASSWORD_RESET_SUCCESS_MESSAGE,
    REFRESH_TOKEN_COOKIE_NAME,
    REFRESH_TOKEN_COOKIE_MAX_AGE,
    REFRESH_TOKEN_EXPIRATION_TIME,
    REFRESH_TOKEN_COOKIE_REMEMBER_ME_MAX_AGE 
} from '@/types.js'
import {
    LoginStepSchema,
    InfoStepSchema,
    UserLoginSchema,
    UserUpdateSchema,
    ResetPasswordRequestSchema,
    getValidationErrorMessage,
} from '@/utils/validation/rules.js'
import type {
    ResetPasswordRequest,
    UserLoginRequest,
    UserLoginResponse,
    UserPostRequest,
    UserUpdatedRequest,
} from '@boltaem/common/type.js'
import type { RefreshTokenService } from '@/services/RefreshTokenService.js'
import { generateJwtToken, fromUserResourceToUserUpdateInput, fromUserUpdatedRequestToUserResource, type UserWithRelations } from '@/utils/mapping/user.mapper.js'
import { encodedAccessSecret, encodedRefreshSecret } from '@/utils/other/authSecret.js'
import { fromUserToUserResponse } from '@/utils/mapping/user.mapper.js'
import {
    getUploadedFile,
    saveUploadedPhoto,
} from '@/utils/multer/saveUploadedPhoto.js'


export class UserController{
    #userService: UserService
    #refreshTokenService: RefreshTokenService
    constructor(userSerivce: UserService, refreshTokenService: RefreshTokenService){
        this.#userService = userSerivce
        this.#refreshTokenService = refreshTokenService
    }

    #sendAuthResponse(res: Response, user: UserLoginResponse, rememberMe: boolean ){
        res.cookie(ACCESS_TOKEN_COOKIE_NAME, user.accessToken, {
            httpOnly: true,
            maxAge: ACCESS_TOKEN_COOKIE_MAX_AGE,
        })
        res.cookie(REFRESH_TOKEN_COOKIE_NAME, user.refreshToken, {
            httpOnly: true,
            maxAge: rememberMe ? REFRESH_TOKEN_COOKIE_REMEMBER_ME_MAX_AGE : REFRESH_TOKEN_COOKIE_MAX_AGE,
        })
        return res.status(API_RESPONSE.OK).json({user: user.user, message: AUTH_SUCCESS_MESSAGE.LOGIN})
    }

    register = async(req: Request, res: Response) => {
        const userRequest: UserPostRequest = req.body
        const loginValidation = LoginStepSchema.safeParse(userRequest)
        if(loginValidation.error){
            return res.status(API_RESPONSE.BAD_REQUEST).json({
                message: getValidationErrorMessage(loginValidation.error),
            })
        }
        const infoValidation = InfoStepSchema.safeParse(userRequest)
        if(infoValidation.error){
            return res.status(API_RESPONSE.BAD_REQUEST).json({
                message: getValidationErrorMessage(infoValidation.error),
            })
        }
        try{
            const user = await this.#userService.createUser(userRequest)
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
                message: getValidationErrorMessage(validation.error),
            })
        }
        try{
            const user = await this.#userService.login(userRequest)
            const userResponse = await fromUserToUserResponse({
                ...user,
                rememberMe: userRequest.rememberMe || false,
            } as UserWithRelations)
            await this.#refreshTokenService.create({ id: userResponse.user.id }, userResponse.refreshToken, userRequest.rememberMe || false)
            return this.#sendAuthResponse(res, userResponse, userRequest.rememberMe || false)
        }catch(error){
            return res.status(API_RESPONSE.ERROR).json({
                message: (error as Error).message,
            })
        }
    }

    me = async(req: Request, res: Response) => {
        try{
            const user = await this.#userService.me(req.authorizedUserId as number)
            const userResponse = await fromUserToUserResponse({
                ...user,
                rememberMe: false,
            } as UserWithRelations)
            return res.status(API_RESPONSE.OK).json(userResponse)
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
            const accessToken = await generateJwtToken({...token.user, rememberMe: req.rememberMe || false}, encodedAccessSecret, ACCESS_TOKEN_EXPIRATION_TIME)
            const newRefreshToken = await generateJwtToken({...token.user, rememberMe: req.rememberMe || false}, encodedRefreshSecret, REFRESH_TOKEN_EXPIRATION_TIME)
            await this.#refreshTokenService.create({ id: token.user.id }, newRefreshToken, false)
            return this.#sendAuthResponse(res, {
                accessToken,
                refreshToken: newRefreshToken,
            } as UserLoginResponse, req.rememberMe || false)
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

    resetPassword = async (req: Request, res: Response) => {
        const resetRequest: ResetPasswordRequest = req.body
        const validation = ResetPasswordRequestSchema.safeParse(resetRequest)

        if (validation.error) {
            return res.status(API_RESPONSE.BAD_REQUEST).json({
                message: getValidationErrorMessage(validation.error),
            })
        }

        try {
            await this.#userService.resetPassword(
                validation.data.token,
                validation.data.password,
            )

            return res.status(API_RESPONSE.OK).json({
                message: PASSWORD_RESET_SUCCESS_MESSAGE.PASSWORD_CHANGED,
            })
        } catch (error) {
            return res.status(API_RESPONSE.BAD_REQUEST).json({
                message: (error as Error).message,
            })
        }
    }

    update = async(req: Request, res: Response) => {
        const userId = req.authorizedUserId as number
        const updatedUser = {
            ...fromUserUpdatedRequestToUserResource(req.body),
            id: userId,
        }

        const validation = UserUpdateSchema.safeParse(updatedUser)
        if(validation.error){
            return res.status(API_RESPONSE.BAD_REQUEST).json({
                message: getValidationErrorMessage(validation.error),
            })
        }
        try{
            const user = await this.#userService.update(
                userId,
                fromUserResourceToUserUpdateInput(updatedUser),
            )
            const photos: { avatar?: string; banner?: string } = {}
            const avatarFile = getUploadedFile(req, 'avatarFile')
            const bannerFile = getUploadedFile(req, 'bannerFile')

            if (avatarFile) {
                photos.avatar = await saveUploadedPhoto(
                    avatarFile,
                    'users',
                    userId,
                    'avatarFile',
                )
            }

            if (bannerFile) {
                photos.banner = await saveUploadedPhoto(
                    bannerFile,
                    'users',
                    userId,
                    'bannerFile',
                )
            }

            if (Object.keys(photos).length > 0) {
                await this.#userService.updatePhotos(userId, photos)
            }

            return res.status(API_RESPONSE.OK).json({
                user: user ? { ...user, ...photos } : user,
                message: AUTH_SUCCESS_MESSAGE.UPDATE_USER,
            })
        }catch(error){
            return res.status(API_RESPONSE.ERROR).json({
                message: (error as Error).message,
            })
        }
    }
}
