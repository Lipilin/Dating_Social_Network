import { getApiErrorMessage } from '@/utils/api/getApiErrorMessage'
import { useCallback, useState } from 'react'

export function useError() {
    const [error, setError] = useState<string | null>(null)

    const handleError = useCallback((err: unknown) => {
        setError(getApiErrorMessage(err))
    }, [])

    const clearError = useCallback(() => setError(null), [])

    return { error, handleError, clearError }
}
