import { ProfileContext } from '@/utils/context/ProfileContext'
import { useContext, useState } from 'react'
import { NeedRegistration } from '@/components/pages/Errors/NeedRegistration'
import { Loader } from '@/components/pages/Loader/Loader'
import { useEffect } from 'react'
import { ProfileEditForm } from './partials/ProfileEditForm'
import type { UserResource } from '@/utils/api/types'
import { useCallback } from 'react'
import { User } from '@/utils/api/User'
import { useError } from '@/hooks/useError'

const userProvider = new User()

export function ProfileEditPage() {
    const { user, isLoading, setUser } = useContext(ProfileContext)
    const [updatedUser, setUpdatedUser] = useState<UserResource | null>(null)
    const { error, handleError, clearError } = useError()
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    const onSend = useCallback(async () => {
        if (!updatedUser) return

        clearError()
        setSuccessMessage(null)

        try {
            const response = await userProvider.withRefreshing(async () => {
                return await userProvider.updateProfile({
                    updatedUser,
                })
            })
            setUser?.(response.user)
            setSuccessMessage(response.message)
        } catch (err) {
            handleError(err)
        }
    }, [updatedUser, setUser, clearError, handleError])

    useEffect(() => {
        if (user) setUpdatedUser(user)
    }, [user])

    if (isLoading) return <Loader isLoading={isLoading} />
    if (!user) return <NeedRegistration />
    if (!updatedUser) return <Loader isLoading={isLoading} />

    return (
        <>
            <ProfileEditForm
                profile={updatedUser}
                setUpdatedUser={setUpdatedUser}
                onSend={onSend}
                error={error}
                successMessage={successMessage}
            />
        </>
    )
}
