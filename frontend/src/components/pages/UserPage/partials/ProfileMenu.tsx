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
            <div className="profile__menu-socials">
                <a href="#" className="wk">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                        <rect width="35.4673" height="35.4673" rx="7.15043" fill="#555961" fillOpacity="0.11" />
                        <path
                            d="M18.1699 23.2632C13.045 23.2632 10.1218 19.4106 10 13H12.5671C12.6515 17.7052 14.544 19.6983 16.0431 20.1092V13H18.4603V17.058C19.9407 16.8834 21.4959 15.0341 22.0206 13H24.4379C24.2401 14.055 23.846 15.0538 23.2802 15.9342C22.7143 16.8145 21.9889 17.5573 21.1493 18.1162C22.0865 18.6268 22.9143 19.3496 23.5781 20.2368C24.2418 21.124 24.7265 22.1555 25 23.2632H22.3392C22.0936 22.3011 21.5946 21.4398 20.9046 20.7874C20.2146 20.135 19.3643 19.7204 18.4603 19.5955V23.2632H18.1699Z"
                            fill="#0077FF"
                        />
                    </svg>
                </a>
                <a href="#" className="youtube">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                        <rect x="0.179688" width="35.4673" height="35.4673" rx="7.15043" fill="#555961" fillOpacity="0.11" />
                        <path
                            d="M27.5633 13.2015C27.1832 12.116 25.9253 11.4586 24.7676 11.3079C20.6035 10.8974 16.4043 10.8974 12.2402 11.3079C11.0826 11.4586 9.82118 12.1096 9.4445 13.2015C8.85183 16.0038 8.85183 18.8862 9.4445 21.6885C9.82464 22.7724 11.0826 23.4314 12.2402 23.5821C16.4043 23.9926 20.6035 23.9926 24.7676 23.5821C25.9253 23.4314 27.1866 22.7804 27.5633 21.6885C28.156 18.8862 28.156 16.0038 27.5633 13.2015ZM16.23 20.8242V14.0642L22.1602 17.4442C20.161 18.5842 18.2205 19.689 16.23 20.8242Z"
                            fill="#F50B0B"
                        />
                    </svg>
                </a>
            </div>
        </div>
    )
}
