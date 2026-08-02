import { useState, useMemo } from 'react'
import { LoginStep, InterestsStep, InfoStep } from './partials'
import { AuthMain } from '@/components/pages/Auth/AuthMain'

enum RegistrationStep{
    LOGIN, 
    INTERESTS, 
    INFO
}

export function RegistrationMain() {
    const [ step, setStep ] = useState<RegistrationStep>(RegistrationStep.LOGIN)
    const stepComponent = useMemo(() => {
        switch(step){
            case RegistrationStep.LOGIN:
                return <LoginStep />
            case RegistrationStep.INTERESTS:
                return <InterestsStep />
            case RegistrationStep.INFO:
                return <InfoStep />
        }
    }, [step])

    return (
        <div>
            { stepComponent }
        </div>
    )
}