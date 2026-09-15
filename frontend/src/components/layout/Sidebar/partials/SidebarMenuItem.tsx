import { images } from '../Sidebar.images'
import type { SidebarMenuItem as SidebarMenuItemType } from '../sidebar.config'
import { Link } from 'react-router'

interface SidebarMenuItemProps {
    item: SidebarMenuItemType
    isActive: boolean
}

export function SidebarMenuItem({ item, isActive }: SidebarMenuItemProps) {
    return (
        <div className={`sidebar__item${isActive ? ' active' : ''}`}>
            <Link to={item.href} className="sidebar__link">
                <img src={images[item.icon]} alt={item.alt ?? ''} />
                <span>{item.label}</span>
            </Link>
        </div>
    )
}
