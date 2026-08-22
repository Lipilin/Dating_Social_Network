import { useCallback, useContext, useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router'
import { NeedRegistration } from '@/components/pages/Errors/NeedRegistration'
import { ProfileContext } from '@/utils/context/ProfileContext'
import { Loader } from '@/components/pages/Loader/Loader'
import { Post } from '@/utils/api/Post'
import { NotFound } from '../Errors/NotFound'
import type { CreatePostRequest, Post as PostResource } from '@/utils/api/types'
import { PostCreationForm } from '../PostCreation/partials/PostCreationForm'
import { useError } from '@/hooks/useError'

const postProvider = new Post()

function toPostFormData(post: PostResource): CreatePostRequest {
    return {
        title: post.title,
        content: post.content,
        tags: post.tags ?? [],
        image: post.image,
    }
}

async function fetchPost(id: number) {
    if (isNaN(id)) throw Error()
    const post = await postProvider.getPost(id)
    if (post == null) throw Error()
    return post
}

export function PostEdit() {
    const { id } = useParams()
    const { state } = useLocation()
    const { user, userProvider, isLoading } = useContext(ProfileContext)
    const { error, handleError, clearError } = useError()
    const [post, setPost] = useState<PostResource | null>(null)
    const [formData, setFormData] = useState<CreatePostRequest | null>(null)
    const [hasError, setHasError] = useState(false)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        if (state?.post != null) {
            setPost(state.post)
        } else {
            async function getPost() {
                const post = await fetchPost(Number(id))
                setPost(post)
            }
            getPost().catch(() => {
                setHasError(true)
            })
        }
    }, [id, state])

    useEffect(() => {
        if (post != null) {
            setFormData(toPostFormData(post))
        }
    }, [post])

    const onSend = useCallback(async () => {
        if (!userProvider || !post || !formData || isSubmitting) return

        clearError()
        setSuccessMessage(null)
        setIsSubmitting(true)

        try {
            const response = await userProvider.withRefreshing(async () => {
                return await postProvider.updatePost(post.id, formData)
            })
            setSuccessMessage(response.message)
        } catch (err) {
            handleError(err)
        } finally {
            setIsSubmitting(false)
        }
    }, [userProvider, post, formData, clearError, handleError, isSubmitting])

    if (hasError) return <NotFound />
    if (isLoading || !post || !formData || isSubmitting) return <Loader isLoading={true} />
    if (user == null) return <NeedRegistration />

    return (
        <PostCreationForm
            onSend={onSend}
            post={formData}
            setPost={setFormData}
            error={error}
            successMessage={successMessage}
            title="Редактирование публикации"
            submitButtonText="Сохранить публикацию"
        />
    )
}
