import type { UserResource } from '@/utils/api/types'
import { createContext } from 'react'

export interface ProfileContextIntreface{
    user: UserResource | null
    setUser?: (user: UserResource) => void
    openAuthModal?: () => void
}



export const ProfileContext = createContext<ProfileContextIntreface>({
    user: null,
})


