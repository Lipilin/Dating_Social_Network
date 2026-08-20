import { Router } from 'express'
import { EmailNotificationsController } from '@/controllers/EmailNotificationsController.js'
import { EmailNotificationService } from '@/services/EmailNotificationService.js'
import { UserService } from '@/services/UserService.js'

const emailNotificationService = new EmailNotificationService()
const userService = new UserService()
const emailNotificationsController = new EmailNotificationsController(
    emailNotificationService,
    userService,
)

export const router = Router()

router.get('/confirm/:token', emailNotificationsController.confirmRegistration.bind(emailNotificationsController))
