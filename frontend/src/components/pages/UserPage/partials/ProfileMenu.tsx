import { Link } from 'react-router'

export type ProfileTab = 'DESCRIPTION' | 'POSTS' | 'ANNOUNCEMENTS'

interface ProfileMenuProps {
    activeTab: ProfileTab
    postsCount: number
    announcementsCount: number
    onTabChange: (tab: ProfileTab) => void
}

export function ProfileMenu({
    activeTab,
    postsCount,
    announcementsCount,
    onTabChange,
}: ProfileMenuProps) {
    return (
        <div className="profile__menu">
            <ul>
                <li>
                    <Link
                        to="#"
                        className={activeTab === 'DESCRIPTION' ? 'active' : ''}
                        onClick={(event) => {
                            event.preventDefault()
                            onTabChange('DESCRIPTION')
                        }}
                    >
                        О себе
                    </Link>
                </li>
                <li>
                    <Link
                        to="#"
                        className={activeTab === 'POSTS' ? 'active' : ''}
                        onClick={(event) => {
                            event.preventDefault()
                            onTabChange('POSTS')
                        }}
                    >
                        Посты ({postsCount})
                    </Link>
                </li>
                <li>
                    <Link
                        to="#"
                        className={activeTab === 'ANNOUNCEMENTS' ? 'active' : ''}
                        onClick={(event) => {
                            event.preventDefault()
                            onTabChange('ANNOUNCEMENTS')
                        }}
                    >
                        Объявления ({announcementsCount})
                    </Link>
                </li>
            </ul>
        </div>
    )
}
