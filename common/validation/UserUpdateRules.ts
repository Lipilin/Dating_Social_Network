import { z } from 'zod'
import { VALIDATION_ERRORS } from '../config.js'
import { InfoStepSchema } from './UserCreationRules.js'

export const UserUpdateSchema = z.object({}) && InfoStepSchema
