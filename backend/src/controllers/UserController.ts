import type { UserService } from '@/services/UserService.js'
import type { Request } from 'express'
import type { Response } from 'express'
import { API_RESPONSE } from '@/types.js'

export class UserController{
    #userService: UserService | null  = null

    constructor(userSerivce: UserService){
        this.#userService = userSerivce
    }

    register = async(req: Request, res: Response) => {
        res.json({ message: 'OK' })
    }

    refresh = async(req: Request, res: Response) => {

    }

    login = async(req: Request, res: Response) => {

    }

    list = async(req: Request, res: Response) => {
        const { id } = req.query
        if(!id) return res.status(API_RESPONSE.BAD_REQUEST).json({})
        
        const entity = await this.#userService?.getUser(String(id))
        if(!entity) return res.status(API_RESPONSE.NOT_FOUND).json({})
        res.status(API_RESPONSE.OK).json(entity)
    }
}