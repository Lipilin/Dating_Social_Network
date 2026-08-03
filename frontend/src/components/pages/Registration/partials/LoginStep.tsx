import { DefaultInput } from '@/components/ui/inputs/DefaultInput'
import { StepChanger } from './StepChanger'
import { AuthSwitcher } from './AuthSwitcher'
import type { UserPostRequest } from '@/utils/api/types'

interface LoginStepProps {
    onNext: () => void
    onSwitchToAuth: () => void
    user: UserPostRequest
    setUserData: (value: UserPostRequest) => void
}

export function LoginStep(
    { 
        onNext, 
        onSwitchToAuth, 
        user, 
        setUserData,
    }: LoginStepProps) {
    return (
        <div className="firstStep">
            <div className="modal__body-form">
                <div className="inputs two">
                    <div className="input_item">
                        <DefaultInput 
                        value={ user.login }
                        setValue={ (value: string) => setUserData({ ...user, login: value }) }
                        label='Логин'
                        id = { 'login_reg' }
                        />
                    </div>
                    <div className="input_item">
                        <DefaultInput 
                        value={ user.email}
                        setValue={ (value: string) => setUserData({ ...user, email: value }) }
                        label='Почта'
                        id = { 'email_reg' }
                        type = { 'email' }
                        />
                    </div>
                    <div className="input_item">
                        <DefaultInput 
                            value={ user.password }
                            setValue={ (value: string) => setUserData({ ...user, password: value }) }
                            label='Пароль'
                            id = { 'password_reg' }
                            type = { 'password' }
                        />
                    </div>
                    <div className="input_item">
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
