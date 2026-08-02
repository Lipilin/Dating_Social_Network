import { useMemo, useState } from 'react'
import arrowRightSvg from '@/assets/images/arrow_right.svg'
import { ModalCloseButton } from '@/components/ui/buttons/ModalCloseButton'

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
    const [step, setStep] = useState<RegistrationStep>(RegistrationStep.LOGIN)
    const [email, setEmail] = useState('')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')
    const [secondName, setSecondName] = useState('')
    const [date, setDate] = useState('')
    const [city, setCity] = useState('')
    const [gender, setGender] = useState('')
    
    const stepComponent = () => {
        switch (step) {
            case RegistrationStep.LOGIN:
                return (
                    <LoginStep
                        onNext={() => setStep(RegistrationStep.INTERESTS)}
                        onSwitchToAuth={() => onSwitchToAuth?.()}   
                        login={login}
                        setLogin={setLogin}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        confirmPassword={confirmPassword}
                        setConfirmPassword={setConfirmPassword}
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
                            onSuccess?.()
                        }}
                        onBack={() => setStep(RegistrationStep.INTERESTS)}
                        name={name}
                        setName={setName}
                        secondName={secondName}
                        setSecondName={setSecondName}
                        date={date}
                        setDate={setDate}
                        city = {city}
                        setCity={setCity}
                    />
                )
        }
    }

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            setStep(RegistrationStep.LOGIN)
            onClose?.()
        }
    }

    const handleClose = () => {
        setStep(RegistrationStep.LOGIN)
        onClose?.()
    }

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
                        {stepComponent()}
                    </form>
                </div>
            </div>
        </div>
    )
}
