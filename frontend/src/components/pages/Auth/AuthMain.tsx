import { useState } from 'react'
import { ModalCloseButton } from '@/components/ui/buttons/ModalCloseButton'
import { DefaultInput } from '@/components/ui/inputs/DefaultInput'

interface AuthMainProps {
    isOpen?: boolean
    onClose?: () => void
    onSwitchToRegistration?: () => void
}

export function AuthMain({ isOpen = false, onClose, onSwitchToRegistration }: AuthMainProps) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose?.()
        }
    }

    return (
        <div className={`modal authorization${isOpen ? ' show' : ''}`} onClick={handleBackdropClick}>
            <div className="modal__content">
                <div className="modal__head">
                    <h4>Войти в свой профиль</h4>
                    <ModalCloseButton onClick={onClose} />
                </div>
                <div className="modal__body">
                    <div className="modal__body-form">
                        <form>
                            <div className="inputs">
                                <div className="input_item">
                                    <input type="email" placeholder="" id="email_auth" />
                                    <label htmlFor="email_auth">Логин или E-Mail</label>
                                </div>
                                <DefaultInput 
                                    id="password_auth" 
                                    label="Пароль" 
                                    value={ password }
                                    setValue={ setPassword }
                                />
                            </div>
                            <div className="links">
                                <a href="#">Забыли пароль?</a>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        onSwitchToRegistration?.()
                                    }}
                                >
                                    Регистрация
                                </a>
                            </div>
                            <div className="row">
                                <button type="submit" className="blue">Войти</button>
                                <label>
                                    <input type="checkbox" />
                                    <span>Запомнить меня</span>
                                </label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
