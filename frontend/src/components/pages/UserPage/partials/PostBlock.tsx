import type { UserResource } from '@/utils/api/types'
import { useContext } from 'react'
import { useNavigate } from 'react-router'
import { ROUTES } from '@/config/General'
import { ProfileContext } from '@/utils/context/ProfileContext'
import { Post } from './Post'
import { ProfileSectionEmpty } from './ProfileSectionEmpty'

export function PostBlock({ user }: { user: UserResource }) {
    const { user: currentUser } = useContext(ProfileContext)
    const navigate = useNavigate()
    const isOwnProfile = currentUser?.id === user.id

    if (user.posts.length === 0) {
        return (
            <ProfileSectionEmpty
                title="Постов пока нет"
                buttonText={isOwnProfile ? 'Создать пост' : undefined}
                onAction={isOwnProfile ? () => navigate(ROUTES.POST_CREATION.URL) : undefined}
            />
        )
    }

    return (
        <div className="locations__wrapper blog">
            {user.posts.map((post, index) => (
                <Post key={post.id} {...post} imageIndex={index} />
            ))}
        </div>
    )
}
