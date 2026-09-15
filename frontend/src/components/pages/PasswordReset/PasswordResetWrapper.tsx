import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { ProfileContext } from '@/utils/context/ProfileContext'
import { getApiErrorMessage } from '@/utils/api/getApiErrorMessage'
import { validatePasswordResetToken } from '@/utils/api/sendEmailConfirmations'
import { PasswordResetContent } from './PasswordResetContent'
import type { PasswordResetStep } from './types'

export function PasswordResetWrapper() {
    const { token } = useParams()
    const navigate = useNavigate()
    const { user, isLoading, openLoginModal } = useContext(ProfileContext)
    const [step, setStep] = useState<PasswordResetStep>('loading')
    const [errorMessage, setErrorMessage] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        if (isLoading) {
            return
        }

        if (user) {
            navigate('/', { replace: true })
        }
    }, [user, isLoading, navigate])

    useEffect(() => {
        if (isLoading || user) {
            return
        }

        if (!token) {
            navigate('/', { replace: true })
            return
        }

        let cancelled = false

        validatePasswordResetToken(token)
            .then((response) => {
                if (!cancelled) {
                    setEmail(response.email)
                    setStep('success')
                }
            })
            .catch((error) => {
                if (!cancelled) {
                    setErrorMessage(getApiErrorMessage(error))
                    setStep('error')
                }
            })

        return () => {
            cancelled = true
        }
    }, [token, navigate, isLoading, user])

    if (!token || isLoading || user) {
        return null
    }

    return (
        <PasswordResetContent
            step={step}
            token={token}
            email={email}
            errorMessage={errorMessage}
            onStepChange={setStep}
            onSubmitError={(message) => {
                setErrorMessage(message)
                setStep('error')
            }}
            onLogin={() => openLoginModal?.()}
        />
    )
}
