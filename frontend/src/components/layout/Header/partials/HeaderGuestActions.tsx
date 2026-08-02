interface HeaderGuestActionsProps {
    onOpenRegistration?: () => void
    onOpenAuth?: () => void
}

export function HeaderGuestActions({ onOpenRegistration, onOpenAuth }: HeaderGuestActionsProps) {
    return (
        <div className="header__buttons">
            <button type="button" className="header__register" onClick={onOpenRegistration}>
                Регистрация
            </button>
            <button type="button" className="header__log" onClick={onOpenAuth}>
                Войти
            </button>
        </div>
    )
}
