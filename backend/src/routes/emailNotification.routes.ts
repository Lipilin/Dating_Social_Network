import { Router } from 'express'
import { EmailNotificationsController } from '@/controllers/EmailNotificationsController.js'
import { EmailNotificationService } from '@/services/EmailNotificationService.js'
import { UserService } from '@/services/UserService.js'

const emailNotificationService = new EmailNotificationService()
const userService = new UserService(emailNotificationService)
const emailNotificationsController = new EmailNotificationsController(
    emailNotificationService,
    userService,
)

export const router = Router()

router.post('/registration', emailNotificationsController.sendRegistrationLetter.bind(emailNotificationsController))
router.post('/password-reset', emailNotificationsController.sendPasswordResetLetter.bind(emailNotificationsController))
