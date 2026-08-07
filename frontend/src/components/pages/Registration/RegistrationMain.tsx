import arrowRightSvg from '@/assets/images/arrow_right.svg'
import { ModalCloseButton } from '@/components/ui/buttons/ModalCloseButton'
import type { 
    UserPostRequest, 
    CategoryWithInterestResource, 
    UserResource } 
from '@/utils/api/types'
import { 
    useState, 
    useMemo, 
    useCallback, 
    useEffect 
} from 'react'
import { 
    LoginStep, 
    InterestsStep, 
    InfoStep } 
from './partials'
import { Category } from '@/utils/api/Category'
import { API_SETTINGS } from '@/config/General'
import { User } from '@/utils/api/User'
import { LoginStepSchema, InfoStepSchema } from '@/utils/validation/UserCreationRules'
import { GENDER } from '@/utils/api/types'

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
    onError?: () => void
}

const categoryProvider = new Category()
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
    const [userPostRequest, setUserPostRequest] = useState<UserPostRequest>(UserPostRequestDefault)
    const [step, setStep] = useState<RegistrationStep>(RegistrationStep.LOGIN)
    const [categories, setCategories] = useState<CategoryWithInterestResource[]>([])
    const [errors, setErrors] = useState<Record<string, string>>({})

    const onSubmit = useCallback(async () => {
        console.log(userPostRequest)
        await userProvider.createUser(userPostRequest).then((data: UserResource | null) => {
            if(data != null) onSuccess?.()
            else onError?.()
        })
    }, [userPostRequest])

    useEffect(() => {
        if(isOpen && categories.length === 0) {
            async function getCategories(){
                await categoryProvider.getCategories({
                    take: API_SETTINGS.DEFAULT_PAGINATION,
                    skip: 0
                }).then((data) => {
                    setCategories(data)
                })
                
            }
            getCategories()
        }
    }, [isOpen])

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
                            onClose?.()
                            onSubmit?.()
                        }}
                        onBack={() => setStep(RegistrationStep.INTERESTS)}
                        user = { userPostRequest }
                        setUserData = { setUserPostRequest }
                        errors = {errors}
                    />
                )
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
