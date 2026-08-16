import { ProfileContext } from '@/utils/context/ProfileContext'
import { useContext, useState } from 'react'
import { NeedRegistration } from '@/components/pages/Errors/NeedRegistration'
import { Loader } from '@/components/pages/Loader/Loader'
import { useEffect } from 'react'
import { ProfileEditForm } from './partials/ProfileEditForm'
import type { UserResource } from '@/utils/api/types'

export function ProfileEditPage() {
    const { user, isLoading } = useContext(ProfileContext)
    const [updatedUser, setUpdatedUser] = useState<UserResource | null>(null)
    useEffect(() => {
        if(user) setUpdatedUser(user)
    }, [user])
    if(isLoading) return <Loader isLoading={isLoading} />
    if(!user) return <NeedRegistration />
    if(!updatedUser) return <Loader isLoading={isLoading} />
    else return <ProfileEditForm profile={updatedUser!} setUpdatedUser={setUpdatedUser} />
}