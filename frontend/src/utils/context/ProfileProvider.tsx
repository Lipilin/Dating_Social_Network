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
    useEffect(() => {
        userProvider.withRefreshing(async () => {
            const response: UserLoginResponse = await userProvider.getMe()
            setUser(response.user)
        })
    }, [])

    const context: ProfileContextIntreface = useMemo(() => ({
        user,
        setUser,
        openAuthModal: onAuthModalOpen
    }), [user, setUser, onAuthModalOpen])

    return (
        <ProfileContext.Provider value = {context} >
            { children }
        </ProfileContext.Provider>
    )
}