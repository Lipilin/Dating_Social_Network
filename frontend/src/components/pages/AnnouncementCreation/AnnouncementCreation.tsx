import { useCallback, useContext, useState } from 'react'
import { ProfileContext } from '@/utils/context/ProfileContext'
import { CategoryContext } from '@/utils/context/CategoryContext'
import { Loader } from '@/components/pages/Loader/Loader'
import { NeedRegistration } from '@/components/pages/Errors/NeedRegistration'
import { AnnouncementCreationForm } from './partials/AnnouncementCreationForm'
import { Announcement } from '@/utils/api/Announcement'
import { useError } from '@/hooks/useError'
import type { AnnouncementCreateRequest } from '@/utils/api/types'
import { GENDER_PREFERENCE } from '@/utils/api/types'

const announcementProvider = new Announcement()

export function AnnouncementCreation() {
    const { user, userProvider, isLoading } = useContext(ProfileContext)
    const { categories } = useContext(CategoryContext)
    const { error, handleError, clearError } = useError()
    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [announcement, setAnnouncement] = useState<AnnouncementCreateRequest>({
        title: '',
        departure: '',
        destination: '',
        dateFrom: '',
        dateTo: '',
        genderPreference: GENDER_PREFERENCE.ANYBODY,
        userAge: 18,
        description: '',
        icon: '',
        interests: [],
    })

    const onSend = useCallback(async () => {
        if (!userProvider || isSubmitting) return

        clearError()
        setSuccessMessage(null)
        setIsSubmitting(true)

        try {
            const response = await userProvider.withRefreshing(async () => {
                return await announcementProvider.createAnnouncement(announcement)
            })
            setSuccessMessage(response.message)
        } catch (err) {
            handleError(err)
        } finally {
            setIsSubmitting(false)
        }
    }, [userProvider, announcement, clearError, handleError, isSubmitting])

    if (isLoading || isSubmitting) return <Loader isLoading={true} />
    if (user == null) return <NeedRegistration />
    return (
        <AnnouncementCreationForm
            onSend={onSend}
            announcement={announcement}
            setAnnouncement={setAnnouncement}
            categories={categories}
            error={error}
            successMessage={successMessage}
        />
    )
}
