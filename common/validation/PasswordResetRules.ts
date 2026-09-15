import { z } from 'zod'
import { VALIDATION_ERRORS } from '../config.js'

export const PasswordResetSchema = z.object({
    email: z.email({ message: VALIDATION_ERRORS.EMAIL_INVALID }),
})
