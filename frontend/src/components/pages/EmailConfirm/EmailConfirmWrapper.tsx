import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { ProfileContext } from '@/utils/context/ProfileContext'
import { getApiErrorMessage } from '@/utils/api/getApiErrorMessage'
import { sendEmailConfirmation } from '@/utils/api/sendEmailConfirmations'
import { EmailConfirmContent } from './EmailConfirmContent'
import type { EmailNotificationStep } from './types'

export function EmailConfirmWrapper() {
    const { token } = useParams()
    const navigate = useNavigate()
    const { openLoginModal, user, isLoading } = useContext(ProfileContext)
    const [step, setStep] = useState<EmailNotificationStep>('loading')
    const [errorMessage, setErrorMessage] = useState('')

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

        sendEmailConfirmation(token)
            .then(() => {
                if (!cancelled) {
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
        <EmailConfirmContent
            step={step}
            errorMessage={errorMessage}
            onLogin={() => openLoginModal?.()}
        />
    )
}
