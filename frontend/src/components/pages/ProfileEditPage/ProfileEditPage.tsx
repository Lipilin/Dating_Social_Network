import { ProfileContext } from '@/utils/context/ProfileContext'
import { useCallback, useContext, useEffect, useState } from 'react'
import { NeedRegistration } from '@/components/pages/Errors/NeedRegistration'
import { Loader } from '@/components/pages/Loader/Loader'
import { ProfileEditForm } from './partials/ProfileEditForm'
import type { UserUpdatedRequest } from '@/utils/api/types'
import { User } from '@/utils/api/User'
import { useError } from '@/hooks/useError'

const userApi = new User()

export function ProfileEditPage() {
    const { user, userProvider, isLoading, setUser } = useContext(ProfileContext)
    const [updatedUserRequest, setUpdatedUserRequest] = useState<UserUpdatedRequest | null>(null)
    const { error, handleError, clearError } = useError()
    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const onSend = useCallback(async () => {
        if (!userProvider || !updatedUserRequest || isSubmitting) return

        clearError()
        setSuccessMessage(null)
        setIsSubmitting(true)

        try {
            const response = await userProvider.withRefreshing(async () => {
                return await userApi.updateProfile(updatedUserRequest)
            })
            setUser?.(response.user)
            setSuccessMessage(response.message)
        } catch (err) {
            handleError(err)
        } finally {
            setIsSubmitting(false)
        }
    }, [userProvider, updatedUserRequest, setUser, clearError, handleError, isSubmitting])

    useEffect(() => {
        if (user) setUpdatedUserRequest({ updatedUser: user })
    }, [user])

    if (isLoading || isSubmitting) return <Loader isLoading={true} />
    if (!user) return <NeedRegistration />
    if (!updatedUserRequest) return <Loader isLoading={isLoading} />

    return (
        <>
            <ProfileEditForm
                updatedUserRequest={updatedUserRequest}
                setUpdatedUserRequest={setUpdatedUserRequest}
                onSend={onSend}
                error={error}
                successMessage={successMessage}
            />
        </>
    )
}
