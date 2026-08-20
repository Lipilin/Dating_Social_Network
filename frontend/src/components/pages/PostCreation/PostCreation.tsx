import { useCallback, useContext, useState } from 'react'
import { ProfileContext } from '@/utils/context/ProfileContext'
import { Loader } from '@/components/pages/Loader/Loader'
import styles from './PostCreation.module.css'
import { PostCreationForm } from './partials/PostCreationForm'
import type { CreatePostRequest } from '@/utils/api/types'
import { Post } from '@/utils/api/Post'
import { useError } from '@/hooks/useError'
import { Message } from '@/components/ui/messages/Message'
import { NeedRegistration } from '../Errors/NeedRegistration'

const postProvider = new Post()

export function PostCreation(){
    const { user, userProvider, isLoading } = useContext(ProfileContext)
    const { error, handleError, clearError } = useError()
    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const [post, setPost] = useState<CreatePostRequest>({
        title: '',
        content: '',
        tags: [],
        image: '',
    })

    const onSend = useCallback(async () => {
        if (!userProvider) return

        clearError()
        setSuccessMessage(null)

        try {
            const response = await userProvider.withRefreshing(async () => {
                return await postProvider.createPost(post)
            })
            setSuccessMessage(response.message)
        } catch (err) {
            handleError(err)
        }
    }, [userProvider, post, clearError, handleError])

    
    if(isLoading) return <Loader isLoading={isLoading} />
    if(user == null ) return <NeedRegistration />
    return (
        <div className = { styles.postCreationWrapper }>
            <h2 className = "section__title">Создание Публикации</h2>
            <PostCreationForm onSend={onSend} post={post} setPost={setPost} />
            {(error || successMessage) && (
                <div className={styles.feedbackMessage}>
                    <Message
                        message={error ?? successMessage!}
                        type={error ? 'error' : 'success'}
                    />
                </div>
            )}
        </div>
    )
}