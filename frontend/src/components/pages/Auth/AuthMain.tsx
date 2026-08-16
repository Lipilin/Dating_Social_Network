import { useCallback, useState, useContext } from 'react'
import { ModalCloseButton } from '@/components/ui/buttons/ModalCloseButton'
import { DefaultInput } from '@/components/ui/inputs/DefaultInput'
import { UserLoginSchema } from '@/utils/validation/UserLoginRules'
import { errorListClasses, inputErrorClasses } from '@/styles/formErrors'
import { Link } from 'react-router'
import { User } from '@/utils/api/User'
import type { UserLoginResponse } from '@boltaem/common/type.js'
import { ProfileContext } from '@/utils/context/ProfileContext'

const authFields = ['email', 'password'] as const
const userProvider = new User() 

interface AuthMainProps {
    isOpen?: boolean
    onClose?: () => void
    onSwitchToRegistration?: () => void
}

export function AuthMain({ isOpen = false, onClose, onSwitchToRegistration }: AuthMainProps) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState<Record<string, string>>({})
    const {user, setUser} = useContext(ProfileContext)

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose?.()
        }
    }

    const onSubmit = useCallback(() => {
        const validateResult = UserLoginSchema.safeParse({ email: email, password: password })
        if (validateResult.error) {
            const messages: Record<string, string> = {}
            validateResult.error.issues.forEach((issue) => {
                if (issue.path.length > 0) {
                    messages[issue.path.join('.')] = issue.message
                }
            })
            setErrors(messages)
        } else {
            async function sendData(){
                await userProvider.login({
                    email: email,
                    password: password,
                    take: 0,
                    skip: 0,
                }).then((data: UserLoginResponse) => {
                    setUser?.(data.user)
                    setErrors({})
                    onClose?.()
                }).catch((error: Error) => {
                    setErrors({
                        serverError: error.message,
                    })
                })
            }
            sendData()
        }
    }, [email, password, onClose])

    const errorMessages = authFields.filter((field) => errors[field])

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
                                <div className={`input_item ${errors.email ? inputErrorClasses : ''}`}>
                                    <DefaultInput 
                                            type='email'
                                            id="email_auth" 
                                            label="E-mail" 
                                            value={ email }
                                            setValue={ setEmail }
                                    />  
                                </div>
                                <div className={`input_item ${errors.password ? inputErrorClasses : ''}`}>
                                    <DefaultInput 
                                        type='password'
                                        id="password_auth" 
                                        label="Пароль" 
                                        value={ password }
                                        setValue={ setPassword }
                                    />   
                                </div>
                            </div>
                            {errorMessages.length > 0 && (
                                <ul className={errorListClasses} role="alert">
                                    {errorMessages.map((field) => (
                                        <li key={field}>{errors[field]}</li>
                                    ))}
                                </ul>
                            )}
                            <div className="links">
                                <Link to="#">Забыли пароль?</Link>
                                <Link
                                    to="#"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        onSwitchToRegistration?.()
                                    }}
                                >
                                    Регистрация
                                </Link>
                            </div>
                            <div className="row">
                                <button type="submit" className="blue" onClick={(e) => {
                                    e.preventDefault()
                                    onSubmit()
                                }}>Войти</button>
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
