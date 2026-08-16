import { Router } from 'express'
import { UserController } from '@/controllers/UserController.js'
import { UserService } from '@/services/UserService.js'
import { securityMiddlewareDefault } from '@/middleware/security.js'
import { RefreshTokenService } from '@/services/RefreshTokenService.js'

const userSerivce = new UserService()           
const refreshTokenService = new RefreshTokenService()
const userController = new UserController(userSerivce, refreshTokenService)
export const router = Router()
router.use(securityMiddlewareDefault)
router.post('/login', userController.login)
router.post('/create', userController.register)
router.post('/refresh', userController.refresh)
router.post('/logout', userController.logout)
router.get('/me', userController.me)
router.get('/list', userController.list)