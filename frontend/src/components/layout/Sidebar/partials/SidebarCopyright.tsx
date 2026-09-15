import { sidebarCopyrightLinks } from '../sidebar.config'
import { Link } from 'react-router'

export function SidebarCopyright() {
    return (
        <div className="sidebar__copyright" style={{ display: 'none' }}>
            {sidebarCopyrightLinks.map((link) => (
                <Link key={link.label} to={link.href}>
                    {link.label}
                </Link>
            ))}
            <span>© 2026 Pick Me Up</span>
        </div>
    )
}
