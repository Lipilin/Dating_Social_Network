import { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { NeedRegistration } from '@/components/pages/Errors/NeedRegistration'
import { ProfileContext } from '@/utils/context/ProfileContext'
import { CategoryContext } from '@/utils/context/CategoryContext'
import { Loader } from '@/components/pages/Loader/Loader'
import { Announcement } from '@/utils/api/Announcement'
import { NotFound } from '../Errors/NotFound'
import type { AnnouncementCreateRequest, AnnouncementResource } from '@/utils/api/types'
import { AnnouncementCreationForm } from '../AnnouncementCreation/partials/AnnouncementCreationForm'
import { useError } from '@/hooks/useError'

const announcementProvider = new Announcement()

function toAnnouncementFormData(announcement: AnnouncementResource): AnnouncementCreateRequest {
    return {
        title: announcement.title,
        departure: announcement.departure,
        destination: announcement.destination,
        dateFrom: announcement.dateFrom.split('T')[0],
        dateTo: announcement.dateTo.split('T')[0],
        genderPreference: announcement.genderInterest,
        userAge: announcement.userAge ?? announcement.user?.age ?? 18,
        description: announcement.description,
        icon: announcement.icon ?? '',
        interests: announcement.interests ?? [],
    }
}

async function fetchAnnouncement(id: number) {
    if(isNaN(id)) throw Error()
    const announcement = await announcementProvider.getById(id)
    if(announcement == null) throw Error()
    return announcement
}

export function AnnouncementEdit() {
    const { id } = useParams()
    const { user, userProvider, isLoading } = useContext(ProfileContext)
    const { categories } = useContext(CategoryContext)
    const { error, handleError, clearError } = useError()
    const [announcement, setAnnouncement] = useState<AnnouncementResource | null>(null)
    const [formData, setFormData] = useState<AnnouncementCreateRequest | null>(null)
    const [hasError, setHasError] = useState(false)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        async function getAnnouncement() {
            const announcement = await fetchAnnouncement(Number(id))
            setAnnouncement(announcement)
        }
        getAnnouncement().catch(() => {
            setHasError(true)
        })
    }, [id])

    useEffect(() => {
        if (announcement != null) {
            setFormData(toAnnouncementFormData(announcement))
        }
    }, [announcement])

    const onSend = useCallback(async () => {
        if (!userProvider || !announcement || !formData || isSubmitting) return

        clearError()
        setSuccessMessage(null)
        setIsSubmitting(true)

        try {
            const response = await userProvider.withRefreshing(async () => {
                return await announcementProvider.updateAnnouncement(announcement.id, formData)
            })
            setSuccessMessage(response.message)
        } catch (err) {
            handleError(err)
        } finally {
            setIsSubmitting(false)
        }
    }, [userProvider, announcement, formData, clearError, handleError, isSubmitting])

    if(hasError) return <NotFound />
    if(isLoading || !announcement || !formData || isSubmitting) return <Loader isLoading={true} />
    if(user == null) return <NeedRegistration />

    return (
        <AnnouncementCreationForm
            onSend={onSend}
            announcement={formData}
            setAnnouncement={setFormData}
            categories={categories}
            error={error}
            successMessage={successMessage}
            title="Редактирование объявления"
            submitButtonText="Сохранить объявление"
        />
    )
}
