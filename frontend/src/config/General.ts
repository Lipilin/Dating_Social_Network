import { GENDER_PREFERENCE } from '@/utils/api/types'
import { MainPage } from '@/components/pages/MainPage'
import { InstructionPage } from '@/components/pages/InstructionPage'
import { AnnouncementPage } from '@/components/pages/AnnouncementPage'
import { DestinationPage } from '@/components/pages/DestinationPage'
import { InterestPage } from '@/components/pages/InterestPage'
import { ProfilePage } from '@/components/pages/ProfilePage'
import type { ComponentType } from 'react'

export const genderLabels = {
    [GENDER_PREFERENCE.MALE]: {
        id: 3,
        value: GENDER_PREFERENCE.MALE, 
        label: 'Ищу Парня'
    }, 
    [GENDER_PREFERENCE.FEMALE]: {
        id: 2,
        value: GENDER_PREFERENCE.FEMALE, 
        label: 'Ищу Девушку'
    },
    [GENDER_PREFERENCE.ANYBODY]: {
        id: 1,
        value: GENDER_PREFERENCE.ANYBODY, 
        label: 'Ищу кого-нибудь'
    }
} as const

interface ApiSettings{
    API_HOST: string, 
    DEFAULT_PAGINATION: number, 
    ENDPOINTS: Record<string, Endpoint>
}

interface Endpoint{
    LIST: string
    CREATE: string
    UPDATE: string  
}

export const API_SETTINGS: ApiSettings = {
    API_HOST: 'http://localhost:3000/api', 
    DEFAULT_PAGINATION: 7, 
    ENDPOINTS: {
        ANNOUNCEMENT: {
            LIST: '/announcement/list', 
            CREATE: '', 
            UPDATE: '', 
        }, 
        CATEGORIES: {
            LIST: '/category/list', 
            CREATE: '', 
            UPDATE: '', 
        }, 
        USER: {
            LIST: '/user/list', 
            CREATE: '/user/create', 
            UPDATE: '', 
        }
    },
} as const

interface Route{
    URL: string, 
    COMPONENT: ComponentType
}

export const ROUTES: Record<string, Route> = {
    HOME: {
        URL: '/', 
        COMPONENT: MainPage,
    },
    INSTRUCTION: {
        URL: '/instruction', 
        COMPONENT: InstructionPage,
    },
    ANNOUNCEMENT: {
        URL: '/announcements', 
        COMPONENT: AnnouncementPage,
    },
    DESTINATION: {
        URL: '/destinations', 
        COMPONENT: DestinationPage,
    },
    INTEREST: {
        URL: '/interests', 
        COMPONENT: InterestPage,
    },
    PROFILE: {
        URL: '/profile', 
        COMPONENT: ProfilePage,
    }
} as const