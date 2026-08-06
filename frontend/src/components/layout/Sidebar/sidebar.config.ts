import { ROUTES } from '@/config/General'
import { images } from './Sidebar.images'

export interface SidebarMenuItem {
    label: string
    href: string
    icon: keyof typeof images
    alt?: string
}

export const sidebarMainItems: SidebarMenuItem[] = [
    { label: 'Профиль', href: ROUTES.PROFILE.URL, icon: 'side_author_icon.svg' },
    { label: 'Лента', href: ROUTES.HOME.URL, icon: 'side_lenta_icon.svg' }, 
    { label: 'Объявления', href: ROUTES.ANNOUNCEMENT.URL, icon: 'side_date_icon.svg', alt: 'Frame 31' },
    { label: 'Публикации', href: ROUTES.POSTS.URL, icon: 'side_help_icon.svg', alt: 'Frame 34' },
    { label: 'Карта', href: '#', icon: 'side_location_icon.svg', alt: 'Frame 33' },
]

export const sidebarExtraItems: SidebarMenuItem[] = [

]

export const sidebarSupportItems: SidebarMenuItem[] = [
    { label: 'Написать в поддержку', href: '#', icon: 'side_date_icon.svg', alt: 'Frame 30' },
]

export const sidebarCopyrightLinks = [
    { label: 'О BOLTAEM', href: '#' },
    { label: 'Помощь', href: '#' },
    { label: 'Пользовательское соглашение', href: '#' },
    { label: 'Конфиденциальность', href: '#' },
] as const
