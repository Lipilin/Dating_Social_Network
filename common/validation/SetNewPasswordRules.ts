import { z } from 'zod'
import { VALIDATION_ERRORS } from '../config.js'

export const SetNewPasswordSchema = z.object({
    password: z.string().min(8, { message: VALIDATION_ERRORS.PASSWORD_MIN_LENGTH }),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: VALIDATION_ERRORS.PASSWORD_MISMATCH,
    path: ['confirmPassword'],
})
