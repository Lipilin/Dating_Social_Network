import { User } from '@/utils/api/User'
import type { UserLoginResponse, UserResource } from '../api/types'
import { useEffect, useState, useMemo } from 'react'
import { ProfileContext } from './ProfileContext'
import type { ProfileContextIntreface } from './ProfileContext'
import axios from 'axios'

interface ProfileProviderProps{
    children: React.ReactNode,
    onAuthModalOpen: () => void,
    onLoginModalOpen: () => void,
}
const userProvider = new User()

export function ProfileProvider({ children, onAuthModalOpen, onLoginModalOpen }: ProfileProviderProps){
    const [user, setUser] = useState<UserResource | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        userProvider.withRefreshing<UserLoginResponse>(async () => {
            return await userProvider.getMe()
        })
        .then((response: UserLoginResponse) => {
            setUser(response.user)
            setIsLoading(false)
        }).catch((err) => {
            if(axios.isCancel(err)) return
            setIsLoading(false)
        })
    }, [])

    const context: ProfileContextIntreface = useMemo(() => ({
        user,
        setUser,
        openAuthModal: onAuthModalOpen,
        openLoginModal: onLoginModalOpen,
        isLoading: isLoading,
        userProvider: userProvider
    }), [user, setUser, onAuthModalOpen, onLoginModalOpen, isLoading])

    return (
        <ProfileContext.Provider value = {context} >
            { children }
        </ProfileContext.Provider>
    )
}