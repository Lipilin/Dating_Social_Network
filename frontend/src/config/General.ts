import { MainPage } from '@/components/pages/MainPage'
import { InstructionPage } from '@/components/pages/InstructionPage'
import { AnnouncementPage } from '@/components/pages/AnnouncementPage'
import { DestinationPage } from '@/components/pages/DestinationPage'
import { InterestPage } from '@/components/pages/InterestPage'
import type { ComponentType } from 'react'
import { UserPage } from '@/components/pages/UserPage/UserPage'
import { ProfilePage } from '@/components/pages/UserPage/ProfilePage'
import { AnnouncementDetail } from '@/components/pages/AnnouncementDetail/AnnouncementDetail'
import { PostsPage } from '@/components/pages/PostsPage/PostsPage'
import { PostDetail } from '@/components/pages/PostDetail/PostDetail'
import { ProfileEditPage } from '@/components/pages/ProfileEditPage/ProfileEditPage'
import { PostCreation } from '@/components/pages/PostCreation/PostCreation'
import { PostEdit } from '@/components/pages/PostEdit/PostEdit'
import { AnnouncementCreation } from '@/components/pages/AnnouncementCreation'
import { AnnouncementEdit } from '@/components/pages/AnnouncementEdit'
export { STATIC_ROUTES_FOR_BUTTOS } from '@boltaem/common/config'
export { userGenderLabels, genderLabels } from '@/config/genderLabels'
export { API_SETTINGS, CATEGORY_DEFAULT_PAGINATION } from '@/config/apiSettings'

interface Route{
    URL: string, 
    COMPONENT: ComponentType<any>
    PROPS?: Record<string, any>
}

export const ROUTES: Record<string, Route> = {
    POSTS: {
        URL: '/posts', 
        COMPONENT: PostsPage,
    },
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
    }, 
    USER: {
        URL: '/user/:id', 
        COMPONENT: UserPage,
    }, 
    ANNOUNCEMENT_DETAIL: {
        URL: '/announcement/:id', 
        COMPONENT: AnnouncementDetail,
    }, 
    POST_DETAIL: {
        URL: '/post/:id', 
        COMPONENT: PostDetail,
    }, 
    PROFILE_EDIT: {
        URL: '/profile/edit',
        COMPONENT: ProfileEditPage,
    }, 
    POST_CREATION: {
        URL: '/post/create',
        COMPONENT: PostCreation,
    },
    POST_EDIT: {
        URL: '/post/:id/edit',
        COMPONENT: PostEdit,
    },
    ANNOUNCEMENT_CREATION: {
        URL: '/announcement/create',
        COMPONENT: AnnouncementCreation,
    },
    ANNOUNCEMENT_EDIT: {
        URL: '/announcement/:id/edit',
        COMPONENT: AnnouncementEdit,
    },
} as const

