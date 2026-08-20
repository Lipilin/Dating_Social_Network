import type { Request, Response } from 'express'
import type { EmailNotificationService } from '@/services/EmailNotificationService.js'
import type { UserService } from '@/services/UserService.js'
import { API_RESPONSE } from '@/types.js'
import {
    EMAIL_CONFIRMATION_SUCCESS_MESSAGE,
} from '@/types.js'
import {
    EMAIL_NOTIFICATION_ERROR_MESSAGE,
    EMAIL_NOTIFICATION_SUCCESS_MESSAGE,
} from '@/config/emailNotificationMessages.js'
import {
    SendPasswordResetEmailSchema,
    SendRegistrationEmailSchema,
    getValidationErrorMessage,
} from '@/utils/validation/rules.js'
import type {
    SendPasswordResetEmailRequest,
    SendRegistrationEmailRequest,
} from '@boltaem/common/type.js'
import { verifyEmailConfirmationToken } from '@/utils/other/emailConfirmationToken.js'

export class EmailNotificationsController {
    #emailNotificationService: EmailNotificationService
    #userService: UserService

    constructor(
        emailNotificationService: EmailNotificationService,
        userService: UserService,
    ) {
        this.#emailNotificationService = emailNotificationService
        this.#userService = userService
    }

    sendRegistrationLetter = async (request: Request, response: Response) => {
        const emailRequest: SendRegistrationEmailRequest = request.body
        const validation = SendRegistrationEmailSchema.safeParse(emailRequest)

        if (validation.error) {
            return response.status(API_RESPONSE.BAD_REQUEST).json({
                message: getValidationErrorMessage(
                    validation.error,
                    EMAIL_NOTIFICATION_ERROR_MESSAGE.VALIDATION,
                ),
            })
        }

        try {
            await this.#emailNotificationService.sendRegistrationEmail(
                validation.data.email,
                validation.data.name,
                validation.data.login,
            )
            return response.status(API_RESPONSE.OK).json({
                message: EMAIL_NOTIFICATION_SUCCESS_MESSAGE.REGISTRATION,
            })
        } catch (error) {
            return response.status(API_RESPONSE.ERROR).json({
                message: (error as Error).message || EMAIL_NOTIFICATION_ERROR_MESSAGE.SEND,
            })
        }
    }

    sendPasswordResetLetter = async (request: Request, response: Response) => {
        const emailRequest: SendPasswordResetEmailRequest = request.body
        const validation = SendPasswordResetEmailSchema.safeParse(emailRequest)

        if (validation.error) {
            return response.status(API_RESPONSE.BAD_REQUEST).json({
                message: getValidationErrorMessage(
                    validation.error,
                    EMAIL_NOTIFICATION_ERROR_MESSAGE.VALIDATION,
                ),
            })
        }

        try {
            await this.#emailNotificationService.sendPasswordResetEmail(
                validation.data.email,
                validation.data.resetLink,
            )
            return response.status(API_RESPONSE.OK).json({
                message: EMAIL_NOTIFICATION_SUCCESS_MESSAGE.PASSWORD_RESET,
            })
        } catch (error) {
            return response.status(API_RESPONSE.ERROR).json({
                message: (error as Error).message || EMAIL_NOTIFICATION_ERROR_MESSAGE.SEND,
            })
        }
    }

    confirmRegistration = async (request: Request, response: Response) => {
        const tokenParam = request.params.token
        const token = Array.isArray(tokenParam) ? tokenParam[0] : tokenParam

        if (!token) {
            return response.status(API_RESPONSE.BAD_REQUEST).json({
                message: EMAIL_NOTIFICATION_ERROR_MESSAGE.VALIDATION,
            })
        }

        try {
            const payload = await verifyEmailConfirmationToken(decodeURIComponent(token))
            await this.#userService.confirmRegistration(payload)

            return response.status(API_RESPONSE.OK).json({
                message: EMAIL_CONFIRMATION_SUCCESS_MESSAGE.CONFIRMED,
            })
        } catch (error) {
            return response.status(API_RESPONSE.BAD_REQUEST).json({
                message: (error as Error).message,
            })
        }
    }
}
