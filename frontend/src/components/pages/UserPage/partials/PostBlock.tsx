import { useCallback, useContext } from 'react'
import { useNavigate } from 'react-router'
import { ROUTES } from '@/config/General'
import { ProfileContext } from '@/utils/context/ProfileContext'
import { ContentItemActions } from './ContentItemActions'
import { Post } from './Post'
import { ProfileSectionEmpty } from './ProfileSectionEmpty'
import type { Profile } from '../utils/types'
import type { Post as PostResource } from '@/utils/api/types'

export function PostBlock({ user }: { user: Profile }) {
    const { user: currentUser } = useContext(ProfileContext)
    const navigate = useNavigate()
    const isOwnProfile = currentUser?.id === user.id

    const editPost = useCallback((post: PostResource) => {
        navigate(ROUTES.POST_EDIT.URL.replace(':id', String(post.id)))
    }, [navigate])

    if (!user?.posts || user?.posts?.length === 0) {
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
                <Post
                    key={post.id}
                    {...post}
                    imageIndex={index}
                    actions={
                        user.isCurrentProfile ? (
                            <ContentItemActions onEdit={() => editPost(post)} />
                        ) : null
                    }
                />
            ))}
        </div>
    )
}
