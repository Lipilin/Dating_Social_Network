import type { UserService } from '@/services/UserService.js'
import type { Request } from 'express'
import type { Response } from 'express'

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
}