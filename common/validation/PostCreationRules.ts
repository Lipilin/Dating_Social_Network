import { z } from 'zod'
import { VALIDATION_ERRORS } from '../config.js'

export const CreatePostSchema = z.object({
    title: z.string().trim().min(3, { message: VALIDATION_ERRORS.POST_TITLE_MIN_LENGTH }),
    content: z.string().trim().min(10, { message: VALIDATION_ERRORS.POST_CONTENT_MIN_LENGTH }),
    image: z.string().optional().default(''),
    tags: z.array(z.string()).optional().default([]),
})
