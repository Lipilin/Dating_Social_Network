import { images } from '../Sidebar.images'
import type { SidebarMenuItem as SidebarMenuItemType } from '../sidebar.config'

interface SidebarMenuItemProps {
    item: SidebarMenuItemType
    isActive: boolean
}

export function SidebarMenuItem({ item, isActive }: SidebarMenuItemProps) {
    return (
        <div className={`sidebar__item${isActive ? ' active' : ''}`}>
            <a href={item.href} className="sidebar__link">
                <img src={images[item.icon]} alt={item.alt ?? ''} />
                <span>{item.label}</span>
            </a>
        </div>
    )
}
