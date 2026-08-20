import { Router } from 'express'
import { UserController } from '@/controllers/UserController.js'
import { UserService } from '@/services/UserService.js'
import { securityMiddlewareDefault } from '@/middleware/security.js'
import { RefreshTokenService } from '@/services/RefreshTokenService.js'
import { authMiddleware } from '@/middleware/Auth.js'
import { EmailNotificationService } from '@/services/EmailNotificationService.js'

const userSerivce = new UserService()           
const refreshTokenService = new RefreshTokenService()
const emailNotificationsService = new EmailNotificationService()
const userController = new UserController(userSerivce, refreshTokenService, emailNotificationsService)
export const router = Router()
router.use(securityMiddlewareDefault)
router.post('/login', userController.login)
router.post('/create', userController.register)
router.post('/refresh', userController.refresh)
router.post('/logout', authMiddleware, userController.logout)
router.get('/me', authMiddleware, userController.me)
router.patch('/update', authMiddleware, userController.update)
router.get('/list', userController.list)