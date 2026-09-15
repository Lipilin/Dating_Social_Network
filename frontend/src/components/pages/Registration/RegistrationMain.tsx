import arrowRightSvg from '@/assets/images/arrow_right.svg'
import { ModalCloseButton } from '@/components/ui/buttons/ModalCloseButton'
import type { 
    UserPostRequest, 
} from '@/utils/api/types'
import { 
    useState, 
    useMemo, 
    useCallback, 
    useContext,
} from 'react'
import { 
    LoginStep, 
    InterestsStep, 
    InfoStep } 
from './partials'
import { API_SETTINGS } from '@/config/General'
import { CategoryContext } from '@/utils/context/CategoryContext'
import { User } from '@/utils/api/User'
import { LoginStepSchema, InfoStepSchema } from '@/utils/validation/UserCreationRules'
import { GENDER } from '@/utils/api/types'
import { Loader } from '@/components/pages/Loader/Loader'

enum RegistrationStep {
    LOGIN = 1,
    INTERESTS = 2,
    INFO = 3,
    LOADING = 4,
}

const RegistrationStepCount = Object.keys(RegistrationStep).filter(key => isNaN(Number(key))).length

interface RegistrationMainProps {
    isOpen?: boolean
    onClose?: () => void
    onSwitchToAuth?: () => void
    onSuccess?: () => void
    onError?: (message: string) => void
}

const userProvider = new User()

const UserPostRequestDefault: UserPostRequest = {
    login: '',
    email: '',
    name: '',
    surname: '',
    password: '',
    confirmPassword: '',
    age: 0,
    city: '',
    gender: GENDER.MALE,
    description: '',
    acceptService: false,
    acceptSecurity: false,
    interests: [],
    take: API_SETTINGS.DEFAULT_PAGINATION,
    skip: 0,
}

export function RegistrationMain({
    isOpen = false,
    onClose,
    onSwitchToAuth,
    onSuccess,
    onError,
}: RegistrationMainProps) {
    const { categories } = useContext(CategoryContext)
    const [userPostRequest, setUserPostRequest] = useState<UserPostRequest>(UserPostRequestDefault)
    const [step, setStep] = useState<RegistrationStep>(RegistrationStep.LOGIN)
    const [errors, setErrors] = useState<Record<string, string>>({})

    const onSubmit = useCallback(async () => {
        setStep(RegistrationStep.LOADING)
        try {
            await userProvider.createUser(userPostRequest)
            onSuccess?.()
        } catch (error) {
            onError?.(error instanceof Error ? error.message : 'Произошла ошибка при регистрации')
        } finally {
            onClose?.()
            setStep(RegistrationStep.LOGIN)
        }
    }, [userPostRequest, onSuccess, onError])

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

    const validate: () => boolean = useCallback(() => {
        const validationRule = (step: RegistrationStep) => {
            switch(step){
                case RegistrationStep.LOGIN:
                    return LoginStepSchema
                case RegistrationStep.INFO:
                    return InfoStepSchema
            }
        }
        setErrors({})
        const result = validationRule(step)?.safeParse(userPostRequest)
        if(result?.error){
            const messages: Record<string, string> = {}
            result.error.issues.forEach(issue => {
                if(issue.path.length > 0){
                    messages[issue.path.join(".")] = issue.message
                }
            })
            setErrors(messages)
            return false
        }
        return true
    }, [step, userPostRequest, setErrors])
    
    const stepComponent = useMemo(() => {
        switch (step) {
            case RegistrationStep.LOGIN:
                return (
                    <LoginStep
                        errors={errors}
                        onNext={() => {
                            if(!validate()) return
                            setStep(RegistrationStep.INTERESTS)
                        }}
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
                        categories={ categories } 
                        user = { userPostRequest }
                        setUserData = { setUserPostRequest }
                    />
                )
            case RegistrationStep.INFO:
                return (
                    <InfoStep
                        onSubmit={() => {
                            if(!validate()) return
                            onSubmit?.()
                        }}
                        onBack={() => setStep(RegistrationStep.INTERESTS)}
                        user = { userPostRequest }
                        setUserData = { setUserPostRequest }
                        errors = {errors}
                    />
                )
            case RegistrationStep.LOADING:
                return <Loader isLoading = { true }/>
        }
    }, [step, userPostRequest, errors, validate])

    return (
        <div className={`modal registration${isOpen ? ' show' : ''}`} onClick={handleBackdropClick}>
            <div className="modal__content">
                <div className="modal__head">
                    <h4 className="min-w-0">
                        Регистрация
                        <div className="icon">
                            <img src={arrowRightSvg} alt="" />
                        </div>
                        <div className="step">
                            Шаг <span>{step}</span> из { RegistrationStepCount }
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
