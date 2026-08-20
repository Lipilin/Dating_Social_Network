import { z } from 'zod'
import { VALIDATION_ERRORS } from '../config.js'
import { GENDER_PREFERENCE } from '../type.js'

export const AnnouncementCreateSchema = z.object({
    title: z.string().trim().min(3, { message: VALIDATION_ERRORS.ANNOUNCEMENT_TITLE_MIN_LENGTH }),
    departure: z.string().trim().min(2, { message: VALIDATION_ERRORS.ANNOUNCEMENT_DEPARTURE_MIN_LENGTH }),
    destination: z.string().trim().min(2, { message: VALIDATION_ERRORS.ANNOUNCEMENT_DESTINATION_MIN_LENGTH }),
    dateFrom: z.string().min(1, { message: VALIDATION_ERRORS.ANNOUNCEMENT_DATE_FROM_REQUIRED }),
    dateTo: z.string().min(1, { message: VALIDATION_ERRORS.ANNOUNCEMENT_DATE_TO_REQUIRED }),
    genderPreference: z.nativeEnum(GENDER_PREFERENCE, { message: VALIDATION_ERRORS.ANNOUNCEMENT_GENDER_REQUIRED }),
    userAge: z.number().min(18, { message: VALIDATION_ERRORS.AGE_MIN_18 }),
    description: z.string().trim().min(10, { message: VALIDATION_ERRORS.ANNOUNCEMENT_DESCRIPTION_MIN_LENGTH }).max(255, { message: VALIDATION_ERRORS.DESCRIPTION_MAX_LENGTH }),
    interests: z.array(z.object({
        id: z.number(),
        name: z.string(),
    })).min(1, { message: VALIDATION_ERRORS.ANNOUNCEMENT_INTERESTS_REQUIRED }),
})
