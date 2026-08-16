import type { UserService } from '@/services/UserService.js'
import type { Request } from 'express'
import type { Response } from 'express'
import { API_RESPONSE } from '@/types.js'
import { LoginStepSchema, InfoStepSchema, UserLoginSchema } from '@/utils/validation/rules.js'
import type { UserLoginRequest, UserPostRequest, UserLoginResponse, UserResource } from '@boltaem/common/type.js'    

export class UserController{
    #userService: UserService | null  = null

    constructor(userSerivce: UserService){
        this.#userService = userSerivce
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
            const user = await this.#userService?.login(userRequest)
            return res.status(API_RESPONSE.OK).json(user)
        }catch(error){
            return res.status(API_RESPONSE.ERROR).json({
                message: (error as Error).message,
            })
        }
    }

    access = async(req: Request, res: Response) => {

    }

    refresh = async(req: Request, res: Response) => {

    }

    list = async(req: Request, res: Response) => {
        const { id } = req.query
        if(!id) return res.status(API_RESPONSE.BAD_REQUEST).json({})

        const numericId = Number(id)
        if(Number.isNaN(numericId)) return res.status(API_RESPONSE.BAD_REQUEST).json({})
        
        const entity = await this.#userService?.getUser(numericId)
        if(!entity) return res.status(API_RESPONSE.NOT_FOUND).json({})
        res.status(API_RESPONSE.OK).json(entity)
    }
}