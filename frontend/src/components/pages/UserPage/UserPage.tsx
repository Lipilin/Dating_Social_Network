import { Navigate, useParams } from 'react-router'
import type { UserResource } from '@/utils/api/types'
import { useEffect, useState, useContext } from 'react'
import { NotFound } from '@/components/pages/Errors/NotFound'
import { UserCommunicationActions } from './partials/UserCommunicationActions'
import { User } from '@/utils/api/User'
import { Loader } from '@/components/pages/Loader/Loader'
import { UserContent } from './partials/UserContent'
import { ProfileContext } from '@/utils/context/ProfileContext'
import { ROUTES } from '@/config/General'

const userProvider = new User()

export function UserPage() {
    const [user, setUser] = useState<UserResource | null>(null)
    const [hasError, setHasError] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState(true)
    const { user: currentUser } = useContext(ProfileContext)
    const { id } = useParams()

    useEffect(() => {
        async function fetchUser() {
            if (!id) return setHasError(true)
            const user: UserResource | null = await userProvider.getProfile(Number(id))
            if (!user) return setHasError(true)
            else setUser(user)
        }
        fetchUser().finally(() => {
            setIsLoading(false)
        })
    }, [id])

    if(isLoading) return <Loader isLoading={isLoading} />
    if (hasError) return <NotFound />
    if (!user) return null
    if(user.id === currentUser?.id) return <Navigate to={ROUTES.PROFILE.URL} />      

    return (
        <UserContent profile={{
            ...user,
            isCurrentProfile: false,
        }} UserActions={UserCommunicationActions} />
    )
}
