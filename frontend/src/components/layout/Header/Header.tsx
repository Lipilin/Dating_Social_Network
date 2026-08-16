import { HeaderLeft } from './partials/HeaderLeft'
import { HeaderGuestActions } from './partials/HeaderGuestActions'
import { HeaderUserPanel } from './partials/HeaderUserPanel'
import { HeaderMessages } from './partials/HeaderMessages'
import { HeaderNotifications } from './partials/HeaderNotifications'
import { useContext } from 'react'
import { ProfileContext } from '@/utils/context/ProfileContext'
interface HeaderProps {
    onOpenAuth?: () => void
    onOpenRegistration?: () => void
    onToggleSidebar?: () => void
}

export function Header({ onOpenAuth, onOpenRegistration, onToggleSidebar }: HeaderProps) {
    const { user } = useContext(ProfileContext)
    return (
        <header className="header">
            <HeaderLeft onToggleSidebar={onToggleSidebar} />
            {user ? <HeaderUserPanel user={user} /> : <HeaderGuestActions
                onOpenAuth={onOpenAuth}
                onOpenRegistration={onOpenRegistration}
            />}
            <HeaderMessages />
            <HeaderNotifications />
        </header>
    )
}
