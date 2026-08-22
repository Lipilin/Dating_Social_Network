import { useContext } from 'react'
import { useParams } from 'react-router'
import { NeedRegistration } from '@/components/pages/Errors/NeedRegistration'
import { ProfileContext } from '@/utils/context/ProfileContext'
import { Loader } from '@/components/pages/Loader/Loader'

export function PostEdit() {
    const { id } = useParams()
    const { user, isLoading } = useContext(ProfileContext)

    if (isLoading) return <Loader isLoading={true} />
    if (user == null) return <NeedRegistration />

    return (
        <div className="section">
            <h2 className="section__title">Редактирование публикации</h2>
            <p>ID: {id}</p>
        </div>
    )
}
