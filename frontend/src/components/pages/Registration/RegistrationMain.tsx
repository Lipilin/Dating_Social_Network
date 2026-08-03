import arrowRightSvg from '@/assets/images/arrow_right.svg'
import { ModalCloseButton } from '@/components/ui/buttons/ModalCloseButton'
import type { UserPostRequest } from '@/utils/api/types'
import { useState, useMemo, useCallback } from 'react'

import { 
    LoginStep, 
    InterestsStep, 
    InfoStep } 
from './partials'

enum RegistrationStep {
    LOGIN = 1,
    INTERESTS = 2,
    INFO = 3,
}

interface RegistrationMainProps {
    isOpen?: boolean
    onClose?: () => void
    onSwitchToAuth?: () => void
    onSuccess?: () => void
}

export function RegistrationMain({
    isOpen = false,
    onClose,
    onSwitchToAuth,
    onSuccess,
}: RegistrationMainProps) {
    const [userPostRequest, setUserPostRequest] = useState<UserPostRequest>({
        login: '',
        email: '',
        name: '',
        surname: '',
        password: '',
        confirmPassword: '',
        age: 0,
        city: '',
        gender: '',
        description: '',
    })
    const [step, setStep] = useState<RegistrationStep>(RegistrationStep.LOGIN)
    const onSubmit = useCallback(() => {
        console.log(userPostRequest)
        onSuccess?.()
    }, [userPostRequest])
    
    const stepComponent = useMemo(() => {
        switch (step) {
            case RegistrationStep.LOGIN:
                return (
                    <LoginStep
                        onNext={() => setStep(RegistrationStep.INTERESTS)}
                        onSwitchToAuth={() => onSwitchToAuth?.()}   
                        user = { userPostRequest }
                        setUserData = { setUserPostRequest }
                    />
                )
            case RegistrationStep.INTERESTS:
                return (
                    <InterestsStep
                        onNext={() => setStep(RegistrationStep.INFO)}
                        onBack={() => setStep(RegistrationStep.LOGIN)}
                        categories={ [] } 
                    />
                )
            case RegistrationStep.INFO:
                return (
                    <InfoStep
                        onSubmit={() => {
                            onClose?.()
                            onSubmit?.()
                        }}
                        onBack={() => setStep(RegistrationStep.INTERESTS)}
                        user = { userPostRequest }
                        setUserData = { setUserPostRequest }
                    />
                )
        }
    }, [step, userPostRequest])

    const handleBackdropClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            setStep(RegistrationStep.LOGIN)
            onClose?.()
        }
    }, [onClose])

    const handleClose = useCallback(() => {
        setStep(RegistrationStep.LOGIN)
        onClose?.()
    }, [onClose])

    return (
        <div className={`modal registration${isOpen ? ' show' : ''}`} onClick={handleBackdropClick}>
            <div className="modal__content">
                <div className="modal__head">
                    <h4>
                        Регистрация
                        <div className="icon">
                            <img src={arrowRightSvg} alt="" />
                        </div>
                        <div className="step">
                            Шаг <span>{step}</span> из 3
                        </div>
                    </h4>
                    <ModalCloseButton onClick={handleClose} />
                </div>
                <div className="modal__body">
                    <form onSubmit={(e) => e.preventDefault()}>
                        { stepComponent }
                    </form>
                </div>
            </div>
        </div>
    )
}
