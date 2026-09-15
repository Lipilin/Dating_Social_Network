import { Router } from 'express'
import { UserController } from '@/controllers/UserController.js'
import { UserService } from '@/services/UserService.js'
import { securityMiddlewareDefault } from '@/middleware/security.js'
import { RefreshTokenService } from '@/services/RefreshTokenService.js'
import { authMiddleware } from '@/middleware/Auth.js'
import { EmailNotificationService } from '@/services/EmailNotificationService.js'
import { multerUserUpload } from '@/utils/multer/user/upload.js'

const emailNotificationsService = new EmailNotificationService()
const userSerivce = new UserService(emailNotificationsService)               
const refreshTokenService = new RefreshTokenService()
const userController = new UserController(userSerivce, refreshTokenService)
export const router = Router()
router.use(securityMiddlewareDefault)
router.post('/login', userController.login)
router.post('/reset-password', userController.resetPassword)
router.post('/create', userController.register)
router.post('/refresh', userController.refresh)
router.post('/logout', authMiddleware, userController.logout)
router.get('/me', authMiddleware, userController.me)
router.patch('/update', authMiddleware, multerUserUpload, userController.update)
router.get('/list', userController.list)    