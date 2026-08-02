import { DefaultInput } from '@/components/ui/inputs/DefaultInput'
import { StepChanger } from './StepChanger'
import { AuthSwitcher } from './AuthSwitcher'

interface LoginStepProps {
    onNext: () => void
    onSwitchToAuth: () => void
    login: string
    setLogin: (value: string) => void
    email: string
    setEmail: (value: string) => void
    password: string
    setPassword: (value: string) => void
    confirmPassword: string
    setConfirmPassword: (value: string) => void
}

export function LoginStep(
    { 
        onNext, 
        onSwitchToAuth, 
        login, 
        setLogin,
        email, 
        setEmail, 
        password,
        setPassword,    
        confirmPassword,
        setConfirmPassword,
    }: LoginStepProps) {
    return (
        <div className="firstStep">
            <div className="modal__body-form">
                <div className="inputs two">
                    <div className="input_item">
                        <DefaultInput 
                        value={ login }
                        setValue={ setLogin }
                        label='Логин'
                        id = { 'login_reg' }
                        />
                    </div>
                    <div className="input_item">
                        <DefaultInput 
                        value={ email}
                        setValue={ setEmail }
                        label='Почта'
                        id = { 'email_reg' }
                        type = { 'email' }
                        />
                    </div>
                    <div className="input_item">
                        <DefaultInput 
                            value={ password }
                            setValue={ setPassword }
                            label='Пароль'
                            id = { 'password_reg' }
                            type = { 'password' }
                        />
                    </div>
                    <div className="input_item">
                        <DefaultInput 
                            value={ confirmPassword }
                            setValue={ setConfirmPassword }
                            label='Пароль ещё раз'  
                            id = { 'confirm_password_reg' }
                            type = { 'password' }
                        />
                    </div>
                </div>
                <div className="checkboxes">
                    <div className="checkboxes__item">
                        <input type="checkbox" id="acceptService" />
                        <label htmlFor="acceptService">
                            Я согласен с <a href="#">правилами сервиса</a>
                        </label>
                    </div>
                    <div className="checkboxes__item">
                        <input type="checkbox" id="acceptSecurity" />
                        <label htmlFor="acceptSecurity">
                            Я согласен с <a href="#">политикой обработки персональных данных</a>
                        </label>
                    </div>
                </div>
                <div className="row">
                    <StepChanger direction="next" onChange={onNext} />
                    <AuthSwitcher onSwitchToAuth={onSwitchToAuth} />
                </div>
            </div>
        </div>
    )
}
