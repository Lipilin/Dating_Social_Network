import { useCallback, useMemo, useState, type ReactNode } from 'react'

export type ModalStep = 'confirm' | 'loading' | 'success' | 'error'

interface ModalView {
    title: string
    content: ReactNode
}

interface ConfirmHandlers {
    submit: () => void
}

interface SuccessHandlers {
    close: () => void
}

interface ErrorHandlers {
    retry: () => void
}

interface UseStepModalProps {
    onAction: () => Promise<void>
    onClose: () => void
    confirmView: (handlers: ConfirmHandlers) => ModalView
    loadingView: () => ModalView
    successView: (handlers: SuccessHandlers) => ModalView
    errorView: (handlers: ErrorHandlers, error: string) => ModalView
}

export function useStepModal({
    onAction,
    onClose,
    confirmView,
    loadingView,
    successView,
    errorView,
}: UseStepModalProps): ModalView {
    const [step, setStep] = useState<ModalStep>('confirm')
    const [error, setError] = useState('')

    const submit = useCallback(() => {
        setStep('loading')
        onAction()
            .then(() => setStep('success'))
            .catch((actionError: Error) => {
                setStep('error')
                setError(actionError.message)
            })
    }, [onAction])

    const retry = useCallback(() => {
        setStep('confirm')
        setError('')
    }, [])

    return useMemo(() => {
        switch (step) {
            case 'confirm':
                return confirmView({ submit })
            case 'loading':
                return loadingView()
            case 'success':
                return successView({ close: onClose })
            case 'error':
                return errorView({ retry }, error)
        }
    }, [
        step,
        error,
        onClose,
        confirmView,
        loadingView,
        successView,
        errorView,
        submit,
        retry,
    ])
}
