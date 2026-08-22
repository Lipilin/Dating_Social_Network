import { NeedRegistration } from '@/components/pages/Errors/NeedRegistration'
import { ProfileContext } from '@/utils/context/ProfileContext'
import { useContext } from 'react'
import { UserContent, UserEditActions } from './partials'
import { Loader } from '../Loader/Loader'

export function ProfilePage() {
    const {user, isLoading} = useContext(ProfileContext)
    if(isLoading) return <Loader isLoading={isLoading} />
    if(!user) return <NeedRegistration />
    return (
        <UserContent profile={{
            ...user,
            isCurrentProfile: true,
        }} UserActions={UserEditActions}/>
    )
}
