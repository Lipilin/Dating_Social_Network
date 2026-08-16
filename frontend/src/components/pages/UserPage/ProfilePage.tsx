import { NeedRegistration } from '@/components/pages/Errors/NeedRegistration'
import { ProfileContext } from '@/utils/context/ProfileContext'
import { useContext } from 'react'
import { UserContent, UserEditActions } from './partials'

export function ProfilePage() {
    const {user} = useContext(ProfileContext)
    if(!user) return <NeedRegistration />
    return (
        <UserContent profile={user} UserActions={UserEditActions} />
    )
}
