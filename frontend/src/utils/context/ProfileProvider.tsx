import { User } from '@/utils/api/User'
import type { UserResource } from '../api/types'
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
        userProvider.getMe().then((response) => setUser(response))
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