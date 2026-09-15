import { z } from 'zod'
import { VALIDATION_ERRORS } from '../config.js'

export const UserLoginSchema = z.object({
    email: z.email({ message: VALIDATION_ERRORS.EMAIL_INVALID }),
    password: z.string().min(8, { message: VALIDATION_ERRORS.PASSWORD_MIN_LENGTH }),
})
