import { useParams } from 'react-router'
import type { UserResource } from '@/utils/api/types'
import { useEffect, useState } from 'react'
import { NotFound } from '@/components/pages/Errors/NotFound'
import { UserCommunicationActions } from './partials/UserCommunicationActions'
import { User } from '@/utils/api/User'
import { UserContent } from './partials/UserContent'

const userProvider = new User()

export function UserPage(){
    const [ user, setUser ] = useState<UserResource | null>(null)
    const [ hasError, setHasError ] = useState<boolean>(false)
    const { id } = useParams()

    useEffect(() => {
        async function fetchUser(){
            if(!id) return setHasError(true)
            const user: UserResource | null = await userProvider.getProfile(String(id))
            if(!user) return setHasError(true)
            else setUser(user)
        }
        fetchUser()
    }, [id])

    return (
        <div className="container">
            { user && (
                <UserContent profile = { user } UserActions = { UserCommunicationActions } />
            ) || hasError && (
                <>
                    <NotFound />
                </>
            )}
        </div>
    )
}