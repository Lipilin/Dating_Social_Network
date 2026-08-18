import { Link } from 'react-router'
import { ROUTES, STATIC_ROUTES_FOR_BUTTOS } from '@/config/General'
import type { UserResource } from '@/utils/api/types'
import { HelpIcon, LogoutIcon, SettingsIcon } from './HeaderUserMenuIcons'
import { useContext } from 'react'
import { ProfileContext } from '@/utils/context/ProfileContext'


interface HeaderUserAccountMenuProps {
    user: UserResource
}

function getUserDisplayName(user: UserResource) {
    return [user.name, user.surname].filter(Boolean).join(' ')
}

export function HeaderUserAccountMenu({ user }: HeaderUserAccountMenuProps) {
    const { setUser, userProvider } = useContext(ProfileContext)
    const handleLogout = async () => {
        await userProvider?.withRefreshing(async () => {
            const response = await userProvider?.logout()
            setUser?.(null)
        })
    }
    return (
        <>
            <p>{getUserDisplayName(user)}</p>
            <ul>
                <li>
                    <Link to={ROUTES.PROFILE_EDIT.URL}>
                        <div className="icon">
                            <SettingsIcon />
                        </div>
                        <span>Настройки</span>
                    </Link>
                </li>
                <li>
                    <Link to={STATIC_ROUTES_FOR_BUTTOS.HELP}>
                        <div className="icon">
                            <HelpIcon />
                        </div>
                        <span>Помощь</span>
                    </Link>
                </li>
                <li>
                    <Link to="#" onClick={handleLogout}>
                        <div className="icon">
                            <LogoutIcon />
                        </div>
                        <span>Выйти</span>
                    </Link>
                </li>
            </ul>
        </>
    )
}
