import axios from 'axios'
import { EMAIL_NOTIFICATION_FALLBACK_ERROR_MESSAGE } from '@boltaem/common/config'

export function getApiErrorMessage(
    error: unknown,
    fallback = EMAIL_NOTIFICATION_FALLBACK_ERROR_MESSAGE,
): string {
    if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message

        if (typeof message === 'string' && message.length > 0) {
            return message
        }
    }

    if (error instanceof Error && error.message.length > 0) {
        return error.message
    }

    return fallback
}
