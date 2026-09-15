import { useState } from 'react'
import { Loader } from '@/components/pages/Loader/Loader'
import { DefaultInput } from '@/components/ui/inputs/DefaultInput'
import { getApiErrorMessage } from '@/utils/api/getApiErrorMessage'
import { resetPassword } from '@/utils/api/resetPassword'
import { SITE_SUPPORT_EMAIL, PASSWORD_RESET_SUCCESS_MESSAGE } from '@pick-me-up/common/config'
import { ResetPasswordRequestSchema } from '@pick-me-up/common/validation/ResetPasswordRules'
import { errorListClasses, inputErrorClasses } from '@/styles/formErrors'
import type { PasswordResetStep } from './types'

interface PasswordResetContentProps {
    step: PasswordResetStep
    token: string
    email?: string
    errorMessage?: string
    onStepChange: (step: PasswordResetStep) => void
    onSubmitError: (message: string) => void
    onLogin: () => void
}

export function PasswordResetContent({
    step,
    token,
    email,
    errorMessage,
    onStepChange,
    onSubmitError,
    onLogin,
}: PasswordResetContentProps) {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async () => {
        const validation = ResetPasswordRequestSchema.safeParse({
            token,
            password,
            confirmPassword,
        })

        if (validation.error) {
            const messages: Record<string, string> = {}
            validation.error.issues.forEach((issue) => {
                if (issue.path.length > 0) {
                    messages[issue.path.join('.')] = issue.message
                }
            })
            setErrors(messages)
            return
        }

        setErrors({})
        setIsSubmitting(true)

        try {
            await resetPassword(validation.data)
            onStepChange('after_reset')
        } catch (error) {
            onSubmitError(getApiErrorMessage(error))
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section className="need-registration">
            <div className="container">
                <div className="need-registration__card">
                    {(step === 'loading' || isSubmitting) && <Loader isLoading />}

                    {step === 'success' && !isSubmitting && (
                        <>
                            <h1>Новый пароль</h1>
                            <p className="need-registration__text">
                                {email
                                    ? `Задайте новый пароль для аккаунта ${email}.`
                                    : 'Задайте новый пароль для вашего аккаунта.'}
                            </p>
                            <div className="modal__body-form">
                                <div className="inputs">
                                    <div className={`input_item ${errors.password ? inputErrorClasses : ''}`}>
                                        <DefaultInput
                                            type="password"
                                            id="new_password"
                                            label="Новый пароль"
                                            value={password}
                                            setValue={setPassword}
                                        />
                                    </div>
                                    <div className={`input_item ${errors.confirmPassword ? inputErrorClasses : ''}`}>
                                        <DefaultInput
                                            type="password"
                                            id="confirm_new_password"
                                            label="Подтверждение пароля"
                                            value={confirmPassword}
                                            setValue={setConfirmPassword}
                                        />
                                    </div>
                                </div>
                                {Object.keys(errors).length > 0 && (
                                    <ul className={errorListClasses} role="alert">
                                        {Object.values(errors).map((message) => (
                                            <li key={message}>{message}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <button
                                type="button"
                                className="need-registration__button"
                                onClick={handleSubmit}
                            >
                                Сохранить пароль
                            </button>
                        </>
                    )}

                    {step === 'after_reset' && !isSubmitting && (
                        <>
                            <h1>Пароль сохранён</h1>
                            <p className="need-registration__text">
                                {PASSWORD_RESET_SUCCESS_MESSAGE.PASSWORD_CHANGED}
                                {' '}
                                Теперь вы можете войти в аккаунт.
                            </p>
                            <button
                                type="button"
                                className="need-registration__button"
                                onClick={onLogin}
                            >
                                Войти
                            </button>
                        </>
                    )}

                    {step === 'error' && !isSubmitting && (
                        <>
                            <h1>Не удалось восстановить пароль</h1>
                            <p className="need-registration__text" role="alert">
                                {errorMessage}
                            </p>
                            <p className="need-registration__text">
                                Если проблема повторяется, напишите администрации сайта на
                                {' '}
                                <a href={`mailto:${SITE_SUPPORT_EMAIL}`}>{SITE_SUPPORT_EMAIL}</a>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}
