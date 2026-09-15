import { Loader } from '@/components/pages/Loader/Loader'
import { EMAIL_CONFIRMATION_SUCCESS_MESSAGE, SITE_SUPPORT_EMAIL } from '@boltaem/common/config'
import type { EmailNotificationStep } from './types'

interface EmailConfirmContentProps {
    step: EmailNotificationStep
    errorMessage?: string
    onLogin: () => void
}

export function EmailConfirmContent({
    step,
    errorMessage,
    onLogin,
}: EmailConfirmContentProps) {
    return (
        <section className="need-registration">
            <div className="container">
                <div className="need-registration__card">
                    {step === 'loading' && <Loader isLoading />}

                    {step === 'success' && (
                        <>
                            <h1>Email подтверждён</h1>
                            <p className="need-registration__text">
                                {EMAIL_CONFIRMATION_SUCCESS_MESSAGE.CONFIRMED}
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

                    {step === 'error' && (
                        <>
                            <h1>Не удалось подтвердить email</h1>
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
