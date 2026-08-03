import type { UserResource } from '@/utils/api/types'
import { createContext } from 'react'

interface ProfileContextIntreface{
    user?: UserResource
    setUser?: (user: UserResource) => void
    openAuthModal?: () => void
}

export const ProfileContext = createContext<ProfileContextIntreface>({})