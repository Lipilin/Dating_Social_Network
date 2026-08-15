import { Router } from 'express'
import { UserController } from '@/controllers/UserController.js'
import { UserService } from '@/services/UserService.js'
import { securityMiddlewareDefault } from '@/middleware/security.js'

const userSerivce = new UserService()
const userController = new UserController(userSerivce)
export const router = Router()
router.use(securityMiddlewareDefault)
router.get('/login', userController.login)
router.post('/create', userController.register)
router.get('/refresh', userController.refresh)
router.get('/access', userController.access)
router.get('/list', userController.list)