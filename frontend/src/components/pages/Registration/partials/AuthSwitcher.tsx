import { Link } from 'react-router'
interface AuthSwitcherProps{
    onSwitchToAuth: () => void
}

export function AuthSwitcher({ onSwitchToAuth }: AuthSwitcherProps){
    return (
        <span>
            У меня есть аккаунт{' '}
            <Link
                to="#"
                onClick={(e) => {
                    e.preventDefault()
                    onSwitchToAuth()
                }}
            >
                Войти
            </Link>
        </span>
    )
}