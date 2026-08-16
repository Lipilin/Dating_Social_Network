import { z } from 'zod'
import { VALIDATION_ERRORS } from '../config.js'

export const LoginStepSchema = z.object({
    login: z.string().min(3, { message: VALIDATION_ERRORS.LOGIN_MIN_LENGTH }),
    email: z.email({ message: VALIDATION_ERRORS.EMAIL_INVALID }),
    password: z.string().min(8, { message: VALIDATION_ERRORS.PASSWORD_MIN_LENGTH }),
    confirmPassword: z.string(),
    acceptSecurity: z.boolean().refine((data) => data == true, { message: VALIDATION_ERRORS.ACCEPT_SECURITY }),
    acceptService: z.boolean().refine((data) => data == true, { message: VALIDATION_ERRORS.ACCEPT_SERVICE }),
}).refine((data) => data.password == data.confirmPassword, {
    message: VALIDATION_ERRORS.PASSWORD_MISMATCH,
    path: ['confirmPassword'],
})

export const InfoStepSchema = z.object({
    name: z.string().min(3, { message: VALIDATION_ERRORS.NAME_MIN_LENGTH }),
    surname: z.string().min(3, { message: VALIDATION_ERRORS.SURNAME_MIN_LENGTH }),
    age: z.number().min(18, { message: VALIDATION_ERRORS.AGE_MIN_18 }),
    city: z.string().min(3, { message: VALIDATION_ERRORS.CITY_MIN_LENGTH }),
    description: z.string().max(255, { message: VALIDATION_ERRORS.DESCRIPTION_MAX_LENGTH }),
})
