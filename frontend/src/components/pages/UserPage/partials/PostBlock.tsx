import { useCallback, useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { ROUTES } from '@/config/General'
import { ProfileContext } from '@/utils/context/ProfileContext'
import { Post as PostApi } from '@/utils/api/Post'
import { PostDeleteRequest } from '@/utils/api/types'
import { ContentItemActions } from './ContentItemActions'
import { Post } from './Post'
import { ProfileSectionEmpty } from './ProfileSectionEmpty'
import type { Profile } from '../utils/types'
import type { Post as PostResource } from '@/utils/api/types'
import { DeleteEntityModal } from '@/components/layout/Modals'

const postApi = new PostApi()

export function PostBlock({ user }: { user: Profile }) {
    const { user: currentUser, userProvider } = useContext(ProfileContext)
    const [isDeleting, setIsDeleting] = useState(false)
    const [postToDelete, setPostToDelete] = useState<PostResource | null>(null)
    const navigate = useNavigate()
    const isOwnProfile = currentUser?.id === user.id

    const editPost = useCallback((post: PostResource) => {
        navigate(ROUTES.POST_EDIT.URL.replace(':id', String(post.id)))
    }, [navigate])

    const deletePost = useCallback(async () => {
        if (!postToDelete || !userProvider) {
            throw new Error('Не удалось удалить пост')
        }

        await userProvider.withRefreshing(async () => {
            return postApi.deletePost(
                new PostDeleteRequest(postToDelete.id),
            )
        })
    }, [postToDelete, userProvider])

    const handleCloseDeleteModal = useCallback(() => {
        setIsDeleting(false)
        setPostToDelete(null)
    }, [])

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
                            <ContentItemActions
                                onEdit={() => editPost(post)}
                                onDelete={() => {
                                    setPostToDelete(post)
                                    setIsDeleting(true)
                                }}
                            />
                        ) : null
                    }
                />
            ))}
            {isDeleting && (
                <DeleteEntityModal
                    onDelete={deletePost}
                    onClose={handleCloseDeleteModal}
                />
            )}
        </div>
    )
}
