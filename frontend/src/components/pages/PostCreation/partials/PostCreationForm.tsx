import { DefaultInput } from "@/components/ui/inputs/DefaultInput"
import { DefaultButton } from "@/components/ui/buttons/DefaultButton"
import type { CreatePostRequest } from "@/utils/api/types"
import styles from '../PostCreation.module.css'

interface PostCreationFormProps{
    post: CreatePostRequest
    onSend: () => Promise<void>
    setPost: (post: CreatePostRequest) => void
}

export function PostCreationForm({ post, onSend, setPost }: PostCreationFormProps){
    return (
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
            <DefaultButton
                onSend={onSend}
                content="Создать публикацию"
                classNames="need-registration__button"
            />
        </div>
    )
}   