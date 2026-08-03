import { useLocation } from 'react-router'
import { SidebarMenuItem } from './SidebarMenuItem'
import { SidebarSocials } from './SidebarSocials'
import { SidebarCopyright } from './SidebarCopyright'
import {
    sidebarExtraItems,
    sidebarMainItems,
    sidebarSupportItems,
} from '../sidebar.config'

function isItemActive(href: string, pathname: string) {
    if (href === '#') return false
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(`${href}/`)
}

export function SidebarMenu() {
    const { pathname } = useLocation()

    return (
        <div className="sidebar__menu">
            {sidebarMainItems.map((item) => (
                <SidebarMenuItem
                    key={`${item.label}-${item.href}`}
                    item={item}
                    isActive={isItemActive(item.href, pathname)}
                />
            ))}

            <div className="sidebar__line">
                {sidebarExtraItems.map((item) => (
                    <SidebarMenuItem
                        key={item.label}
                        item={item}
                        isActive={isItemActive(item.href, pathname)}
                    />
                ))}
            </div>

            <SidebarSocials />

            <div className="sidebar__line">
                {sidebarSupportItems.map((item) => (
                    <SidebarMenuItem
                        key={item.label}
                        item={item}
                        isActive={isItemActive(item.href, pathname)}
                    />
                ))}
            </div>

            <SidebarCopyright />
        </div>
    )
}
