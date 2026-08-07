import type { Post } from '@/utils/api/types'
import styles from './PostDetailContent.module.css'
import { Link } from 'react-router'
import { ROUTES } from '@/config/General'

export function PostDetailContent({ post }: { post: Post }) {
    return (
        <div className = { styles.postDetailContainer }>
            <div className = { styles.postDetailContent }>
                <div className = { styles.postDetailHeader }>
                    <h1 className = { styles.postDetailTitle }>
                        { post.title }
                    </h1>
                    { 
                        post.user && (
                            <div>
                                <span className = { styles.postDetailDate }>Автор: </span>
                                <span className = { styles.postDetailValue }>
                                    { post.user.name } { post.user.surname }
                                </span>
                            </div>
                        )
                    }
                    <span className = { styles.postDetailDate }>Опубликовано: </span>
                    <span className = { styles.postDetailValue }>
                    { new Date(post.createdAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }) }
                    </span>
                </div>
                <div className = {styles.mainContent}>
                    <h3 className = { styles.postDetailTitle }>
                        Содержание
                    </h3>
                    <div className = {styles.content}>
                        { post.content }
                    </div>
                </div>
                <div className = {styles.tags}>
                    <h5 className = { styles.postDetailTitle }>
                        Теги
                    </h5>
                    <div className = {styles.tagsList}>
                        { post.tags?.map((tag) => (
                            <span key = {tag} className = {styles.tag}>{tag}</span>
                        )) }
                    </div>
                </div>
                {
                    post.user && (
                        <div className={styles.authorCta}>
                            <p className={styles.authorCtaText}>
                                Понравился пост? Больше постов от{' '}
                                <span className={styles.authorCtaName}>
                                    { post.user.name } { post.user.surname }
                                </span>
                            </p>
                            <Link
                                to={ ROUTES.USER.URL.replace(':id', post.user.id) }
                                className={styles.authorCtaLink}
                            >
                                <span>Больше постов</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="7" height="10" viewBox="0 0 7 10" fill="none" aria-hidden="true">
                                    <path d="M1 9L5 5L1 1" stroke="currentColor" strokeWidth="2" />
                                </svg>
                            </Link>
                        </div>
                    )
                }
            </div>
        </div>
    )
}