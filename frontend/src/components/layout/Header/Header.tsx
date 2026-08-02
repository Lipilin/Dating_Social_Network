import { HeaderLeft } from './partials/HeaderLeft'
import { HeaderGuestActions } from './partials/HeaderGuestActions'
import { HeaderUserPanel } from './partials/HeaderUserPanel'
import { HeaderMessages } from './partials/HeaderMessages'
import { HeaderNotifications } from './partials/HeaderNotifications'

interface HeaderProps {
    onOpenAuth?: () => void
    onOpenRegistration?: () => void
}

export function Header({ onOpenAuth, onOpenRegistration }: HeaderProps) {
    return (
        <header className="header">
            <HeaderLeft />
            <HeaderGuestActions
                onOpenAuth={onOpenAuth}
                onOpenRegistration={onOpenRegistration}
            />
            <HeaderUserPanel />
            <HeaderMessages />
            <HeaderNotifications />
        </header>
    )
}
