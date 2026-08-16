import { User } from '@/utils/api/User'
import type { UserLoginResponse, UserResource } from '../api/types'
import { useEffect, useState, useMemo } from 'react'
import { ProfileContext } from './ProfileContext'
import type { ProfileContextIntreface } from './ProfileContext'

interface ProfileProviderProps{
    children: React.ReactNode, 
    onAuthModalOpen: () => void, 
    
}
const userProvider = new User()

export function ProfileProvider({children, onAuthModalOpen}: ProfileProviderProps){
    const [user, setUser] = useState<UserResource | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        userProvider.withRefreshing<UserLoginResponse>(async () => {
            return await userProvider.getMe()
        }).then((response: UserLoginResponse) => setUser(response.user))
        .finally(() => setIsLoading(false))
    }, [])

    const context: ProfileContextIntreface = useMemo(() => ({
        user,
        setUser,
        openAuthModal: onAuthModalOpen, 
        isLoading: isLoading
    }), [user, setUser, onAuthModalOpen, isLoading])

    return (
        <ProfileContext.Provider value = {context} >
            { children }
        </ProfileContext.Provider>
    )
}