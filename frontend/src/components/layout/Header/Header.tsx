import { HeaderLeft } from './partials/HeaderLeft'
import { HeaderGuestActions } from './partials/HeaderGuestActions'
import { HeaderUserPanel } from './partials/HeaderUserPanel'
import { HeaderLoader } from './partials/HeaderLoader'
import { HeaderMessages } from './partials/HeaderMessages'
import { HeaderNotifications } from './partials/HeaderNotifications'
import { useContext, useEffect, useRef } from 'react'
import { ProfileContext } from '@/utils/context/ProfileContext'
interface HeaderProps {
    onOpenAuth?: () => void
    onOpenRegistration?: () => void
    onToggleSidebar?: () => void
}

function HeaderAuthArea({
    onOpenAuth,
    onOpenRegistration,
}: Pick<HeaderProps, 'onOpenAuth' | 'onOpenRegistration'>) {
    const { user, isLoading } = useContext(ProfileContext)

    if (isLoading) {
        return <HeaderLoader />
    }

    if (user) {
        return <HeaderUserPanel user={user} />
    }

    return (
        <HeaderGuestActions
            onOpenAuth={onOpenAuth}
            onOpenRegistration={onOpenRegistration}
        />
    )
}

export function Header({ onOpenAuth, onOpenRegistration, onToggleSidebar }: HeaderProps) {
    const headerRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const header = headerRef.current
        if (!header) return

        const updateHeaderHeight = () => {
            document.documentElement.style.setProperty(
                '--header-height',
                `${header.getBoundingClientRect().height}px`,
            )
        }

        updateHeaderHeight()

        const resizeObserver = new ResizeObserver(updateHeaderHeight)
        resizeObserver.observe(header)
        window.addEventListener('resize', updateHeaderHeight)

        return () => {
            resizeObserver.disconnect()
            window.removeEventListener('resize', updateHeaderHeight)
        }
    }, [])

    return (
        <header className="header" ref={headerRef}>
            <HeaderLeft onToggleSidebar={onToggleSidebar} />
            <HeaderAuthArea
                onOpenAuth={onOpenAuth}
                onOpenRegistration={onOpenRegistration}
            />
            <HeaderMessages />
            <HeaderNotifications />
        </header>
    )
}
