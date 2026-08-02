interface AuthSwitcherProps{
    onSwitchToAuth: () => void
}

export function AuthSwitcher({ onSwitchToAuth }: AuthSwitcherProps){
    return (
        <span>
            У меня есть аккаунт{' '}
            <a
                href="#"
                onClick={(e) => {
                    e.preventDefault()
                    onSwitchToAuth()
                }}
            >
                Войти
            </a>
        </span>
    )
}