import { useCallback, useState } from 'react'
import { Loader } from '@/components/pages/Loader/Loader'
import { DefaultInput } from '@/components/ui/inputs/DefaultInput'
import { useStepModal } from '@/hooks/modals/useStepModal'
import { PasswordResetSchema } from '@/utils/validation/PasswordResetRules'
import { errorListClasses, inputErrorClasses } from '@/styles/formErrors'
import styles from '@/components/layout/Modals/ResetPasswordModal/ResetPasswordModal.module.css'

interface UseResetPasswordModalProps {
    email: string
    onInput: (email: string) => void
    onClose: () => void
    onSend: () => Promise<void>
}

export function useResetPasswordModal({
    email,
    onInput,
    onClose,
    onSend,
}: UseResetPasswordModalProps) {
    const [errors, setErrors] = useState<Record<string, string>>({})

    const confirmView = useCallback(({ submit }: { submit: () => void }) => ({
        title: 'Восстановление пароля',
        content: (
            <>
                <p>Введите email, указанный при регистрации. Мы отправим инструкцию по восстановлению пароля.</p>
                <div className={`inputs ${styles.emailField}`}>
                    <div className={`input_item ${errors.email ? inputErrorClasses : ''}`}>
                        <DefaultInput
                            type="email"
                            id="reset_password_email"
                            label="E-mail"
                            value={email}
                            setValue={onInput}
                        />
                    </div>
                </div>
                {errors.email && (
                    <ul className={errorListClasses} role="alert">
                        <li>{errors.email}</li>
                    </ul>
                )}
                <div className="row">
                    <button
                        type="button"
                        className="blue"
                        onClick={() => {
                            const validateResult = PasswordResetSchema.safeParse({ email })

                            if (validateResult.error) {
                                const messages: Record<string, string> = {}
                                validateResult.error.issues.forEach((issue) => {
                                    if (issue.path.length > 0) {
                                        messages[issue.path.join('.')] = issue.message
                                    }
                                })
                                setErrors(messages)
                                return
                            }

                            setErrors({})
                            submit()
                        }}
                    >
                        Отправить
                    </button>
                </div>
            </>
        ),
    }), [email, errors.email, onInput])

    const loadingView = useCallback(() => ({
        title: 'Отправка письма...',
        content: <Loader isLoading />,
    }), [])

    const successView = useCallback(({ close }: { close: () => void }) => ({
        title: 'Письмо отправлено',
        content: (
            <>
                <p>Инструкция по восстановлению пароля отправлена на ваш email.</p>
                <div className="row">
                    <button type="button" className="blue" onClick={close}>
                        Закрыть
                    </button>
                </div>
            </>
        ),
    }), [])

    const errorView = useCallback(({ retry }: { retry: () => void }, error: string) => ({
        title: 'Ошибка при восстановлении пароля',
        content: (
            <>
                <p>Произошла ошибка при отправке письма. {error}</p>
                <div className="row">
                    <button type="button" className="blue" onClick={retry}>
                        Попробовать снова
                    </button>
                </div>
            </>
        ),
    }), [])

    return useStepModal({
        onAction: onSend,
        onClose,
        confirmView,
        loadingView,
        successView,
        errorView,
    })
}
