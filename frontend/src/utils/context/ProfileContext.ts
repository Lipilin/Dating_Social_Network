import type { UserResource } from '@/utils/api/types'
import { createContext } from 'react'
import type { User } from '../api/User'

export interface ProfileContextIntreface{
    user: UserResource | null
    setUser?: (user: UserResource | null) => void
    openAuthModal?: () => void
    isLoading: boolean
    userProvider: User | null
}



export const ProfileContext = createContext<ProfileContextIntreface>({
    user: null,
    isLoading: true, 
    userProvider: null
})


