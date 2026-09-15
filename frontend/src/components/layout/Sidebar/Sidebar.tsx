import { SidebarMenu } from './partials/SidebarMenu'

interface SidebarProps {
    isActive?: boolean
}

export function Sidebar({ isActive = false }: SidebarProps) {
    return (
        <aside className={`sidebar${isActive ? ' active' : ''}`}>
            <SidebarMenu />
        </aside>
    )
}
