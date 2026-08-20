import { z } from 'zod'
import { VALIDATION_ERRORS } from '../config.js'

export const SendRegistrationEmailSchema = z.object({
    email: z.email({ message: VALIDATION_ERRORS.EMAIL_INVALID }),
    name: z.string().min(1, { message: VALIDATION_ERRORS.NAME_REQUIRED }),
    login: z.string().min(3, { message: VALIDATION_ERRORS.LOGIN_MIN_LENGTH }),
})

export const SendPasswordResetEmailSchema = z.object({
    email: z.email({ message: VALIDATION_ERRORS.EMAIL_INVALID }),
    resetLink: z.string().min(1, { message: 'Ссылка сброса пароля обязательна' }),
})
