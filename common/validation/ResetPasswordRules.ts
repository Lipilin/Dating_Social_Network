import { z } from 'zod'
import { VALIDATION_ERRORS } from '../config.js'
import { SetNewPasswordSchema } from './SetNewPasswordRules.js'

export const ResetPasswordRequestSchema = SetNewPasswordSchema.extend({
    token: z.string().min(1, { message: VALIDATION_ERRORS.TOKEN_REQUIRED }),
})
