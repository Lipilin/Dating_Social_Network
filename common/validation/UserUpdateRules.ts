import { z } from 'zod'
import { VALIDATION_ERRORS } from '../config.js'

export const UserUpdateRules = z.object({
    name: z.string().min(1, { message: VALIDATION_ERRORS.NAME_REQUIRED }),
    surname: z.string().min(1, { message: VALIDATION_ERRORS.SURNAME_REQUIRED }),
    age: z.number().min(1, { message: VALIDATION_ERRORS.AGE_REQUIRED }),
    city: z.string().min(1, { message: VALIDATION_ERRORS.CITY_REQUIRED }),
    description: z.string().min(1, { message: VALIDATION_ERRORS.DESCRIPTION_REQUIRED }),
})
