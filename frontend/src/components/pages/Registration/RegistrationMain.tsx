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

export function RegistrationMain({
    isOpen = false,
    onClose,
    onSwitchToAuth,
    onSuccess,
    onError,
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
        acceptService: false,
        acceptSecurity: false,
        interests: [],
    })
    const [step, setStep] = useState<RegistrationStep>(RegistrationStep.LOGIN)
    const [categories, setCategories] = useState<CategoryWithInterestResource[]>([])
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
                        categories={ categories } 
                        user = { userPostRequest }
                        setUserData = { setUserPostRequest }
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
