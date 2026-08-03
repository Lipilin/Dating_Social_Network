import { sidebarCopyrightLinks } from '../sidebar.config'

export function SidebarCopyright() {
    return (
        <div className="sidebar__copyright" style={{ display: 'none' }}>
            {sidebarCopyrightLinks.map((link) => (
                <a key={link.label} href={link.href}>
                    {link.label}
                </a>
            ))}
            <span>© 2025 BOLTAEM</span>
        </div>
    )
}
