import type { ZodError } from 'zod'

export function getValidationErrorMessage(error: ZodError, fallback = 'Некорректные данные'): string {
    return error.issues[0]?.message ?? fallback
}
