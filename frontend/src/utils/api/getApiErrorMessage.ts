import axios from 'axios'

export function getApiErrorMessage(error: unknown, fallback = 'Произошла ошибка при выполнении запроса'): string {
    if (axios.isAxiosError(error) && typeof error.response?.data?.message === 'string') {
        return error.response.data.message
    }
    if (error instanceof Error && error.message) {
        return error.message
    }
    return fallback
}
