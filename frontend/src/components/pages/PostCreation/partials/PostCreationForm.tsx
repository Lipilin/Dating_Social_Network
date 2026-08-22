import { DefaultInput } from '@/components/ui/inputs/DefaultInput'
import { DefaultButton } from '@/components/ui/buttons/DefaultButton'
import type { CreatePostRequest } from '@/utils/api/types'
import styles from '../PostCreation.module.css'
import { Message } from '@/components/ui/messages/Message'

interface PostCreationFormProps {
    post: CreatePostRequest
    onSend: () => Promise<void>
    setPost: (post: CreatePostRequest) => void
    error?: string | null
    successMessage?: string | null
    title?: string
    submitButtonText?: string
}

export function PostCreationForm({
    post,
    onSend,
    setPost,
    error,
    successMessage,
    title = 'Создание Публикации',
    submitButtonText = 'Создать публикацию',
}: PostCreationFormProps) {
    return (
        <div className={styles.postCreationWrapper}>
            <h2 className="section__title">{title}</h2>
            <div className={styles.postCreationForm}>
                <div className={styles.inputWrapper}>
                    <DefaultInput
                        id="post-title"
                        value={post.title}
                        setValue={(value) => setPost({ ...post, title: value })}
                        label="Заголовок"
                    />
                </div>
                <div className={styles.textareaWrapper}>
                    <textarea
                        placeholder=" "
                        value={post.content}
                        onChange={(e) => setPost({ ...post, content: e.target.value })}
                        id="post-content"
                    />
                    <label htmlFor="post-content">Содержание</label>
                </div>
                {(error || successMessage) && (
                    <div className={styles.feedbackMessage}>
                        <Message
                            message={error ?? successMessage!}
                            type={error ? 'error' : 'success'}
                        />
                    </div>
                )}
                <DefaultButton
                    onSend={onSend}
                    content={submitButtonText}
                    classNames="need-registration__button"
                />
            </div>
        </div>
    )
}
