import { Router } from "express"
import { UserController } from "@/controllers/UserController.js"
import { UserService } from "@/services/UserService.js"

const userSerivce = new UserService()
const userController = new UserController(userSerivce)
export const router = Router()
router.get('/login', userController.login)
router.get('/register', userController.register)
router.get('/refresh', userController.refresh)