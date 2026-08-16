import { Link } from 'react-router'
import { ROUTES, STATIC_ROUTES_FOR_BUTTOS } from '@/config/General'
import type { UserResource } from '@/utils/api/types'
import { HelpIcon, LogoutIcon, SettingsIcon } from './HeaderUserMenuIcons'

interface HeaderUserAccountMenuProps {
    user: UserResource
}

function getUserDisplayName(user: UserResource) {
    return [user.name, user.surname].filter(Boolean).join(' ')
}

export function HeaderUserAccountMenu({ user }: HeaderUserAccountMenuProps) {
    return (
        <>
            <p>{getUserDisplayName(user)}</p>
            <ul>
                <li>
                    <Link to={ROUTES.PROFILE.URL}>
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
                    <Link to="#">
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
