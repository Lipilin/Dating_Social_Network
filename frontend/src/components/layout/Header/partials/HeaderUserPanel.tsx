import type { UserResource } from '@/utils/api/types'
import { HeaderUserAccount } from './HeaderUserPanel/HeaderUserAccount'
import { HeaderUserActions } from './HeaderUserPanel/HeaderUserActions'

interface HeaderUserPanelProps {
    user: UserResource
}

export function HeaderUserPanel({ user }: HeaderUserPanelProps) {
    return (
        <div className="header__right">
            <HeaderUserActions />
            <HeaderUserAccount user={user} />
        </div>
    )
}
