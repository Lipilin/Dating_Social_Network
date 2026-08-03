import { DefaultInput } from '@/components/ui/inputs/DefaultInput'
import { StepChanger } from './StepChanger'
import { AuthSwitcher } from './AuthSwitcher'
import type { UserPostRequest } from '@/utils/api/types'

const inputErrorClasses =
    '[&_input]:!shadow-[inset_0_-2px_0_0_rgba(239,100,100,0.9)]'

const checkboxErrorClasses =
    '[&_input:not(:checked)]:!ring-2 [&_input:not(:checked)]:!ring-red-400/70 [&_input:not(:checked)]:!ring-offset-0'

const errorListClasses =
    'mt-3 flex flex-col gap-1 text-sm leading-snug text-red-500/90 break-words'

const loginStepFields = [
    'login',
    'email',
    'password',
    'confirmPassword',
    'acceptService',
    'acceptSecurity',
] as const

interface LoginStepProps {
    onNext: () => void
    onSwitchToAuth: () => void
    user: UserPostRequest
    setUserData: (value: UserPostRequest) => void
    errors: Record<string, string>
}

export function LoginStep(
    { 
        onNext, 
        onSwitchToAuth, 
        user, 
        setUserData,
        errors,
    }: LoginStepProps) {
    const errorMessages = loginStepFields.filter((field) => errors[field])

    return (
        <div className="firstStep">
            <div className="modal__body-form">
                <div className="inputs two">
                    <div className={`input_item ${errors.login ? inputErrorClasses : ''}`}>
                        <DefaultInput 
                        value={ user.login }
                        setValue={ (value: string) => setUserData({ ...user, login: value }) }
                        label='Логин'
                        id = { 'login_reg' }
                        />
                    </div>
                    <div className={`input_item ${errors.email ? inputErrorClasses : ''}`}>
                        <DefaultInput 
                        value={ user.email}
                        setValue={ (value: string) => setUserData({ ...user, email: value }) }
                        label='Почта'
                        id = { 'email_reg' }
                        type = { 'email' }
                        />
                    </div>
                    <div className={`input_item ${errors.password ? inputErrorClasses : ''}`}>
                        <DefaultInput 
                            value={ user.password }
                            setValue={ (value: string) => setUserData({ ...user, password: value }) }
                            label='Пароль'
                            id = { 'password_reg' }
                            type = { 'password' }
                        />
                    </div>
                    <div className={`input_item ${errors.confirmPassword ? inputErrorClasses : ''}`}>
                        <DefaultInput 
                            value={ user.confirmPassword }
                            setValue={ (value: string) => setUserData({ ...user, confirmPassword: value }) }
                            label='Пароль ещё раз'  
                            id = { 'confirm_password_reg' }
                            type = { 'password' }
                        />
                    </div>
                </div>
                <div className="checkboxes">
                    <div className={`checkboxes__item ${errors.acceptService ? checkboxErrorClasses : ''}`}>
                        <input
                            type="checkbox" 
                            id="acceptService" 
                            checked = { user.acceptService } 
                            onChange={ (e) => setUserData({ ...user, acceptService: e.target.checked }) 
                        }/>
                        <label htmlFor="acceptService">
                            Я согласен с <a href="#">правилами сервиса</a>
                        </label>
                    </div>
                    <div className={`checkboxes__item ${errors.acceptSecurity ? checkboxErrorClasses : ''}`}>
                        <input
                            type="checkbox" 
                            id="acceptSecurity" 
                            checked = { user.acceptSecurity } 
                            onChange={ (e) => setUserData({ ...user, acceptSecurity: e.target.checked }) 
                        }/>
                        <label htmlFor="acceptSecurity">
                            Я согласен с <a href="#">политикой обработки персональных данных</a>
                        </label>
                    </div>
                </div>
                {errorMessages.length > 0 && (
                    <ul className={errorListClasses}>
                        {errorMessages.map((field) => (
                            <li key={field}>{errors[field]}</li>
                        ))}
                    </ul>
                )}
                <div className="row">
                    <StepChanger direction="next" onChange={ onNext } />
                    <AuthSwitcher onSwitchToAuth={onSwitchToAuth} />
                </div>
            </div>
        </div>
    )
}
