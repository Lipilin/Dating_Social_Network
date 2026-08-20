import { useState, useEffect, useContext } from 'react'
import { Post } from "@/utils/api/Post"
import type { Post as PostResource } from '@boltaem/common/type'
import { DefaultPagination } from '@/components/ui/pagination/DefaultPagination'
import { Loader } from '@/components/pages/Loader/Loader'
import { NoDataFound } from '../Errors/NoDataFound'
import { DefaultButton } from '@/components/ui/buttons/DefaultButton'
import { ROUTES } from '@/config/General'
import { ProfileContext } from '@/utils/context/ProfileContext'
import { useNavigate } from 'react-router'
import styles from './PostPage.module.css'
import { Post as PostCard} from '@/components/pages/UserPage/partials/Post'

const TAKE: number = 5
const postService = new Post()

export function PostsPage() {
    const { user, openAuthModal } = useContext(ProfileContext)
    const navigate = useNavigate()
    const [posts, setPosts] = useState<PostResource[]>([])
    const [pagination, setPagination] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    const handleCreatePost = () => {
        if (user == null) {
            openAuthModal?.()
        } else {
            navigate(ROUTES.POST_CREATION.URL)
        }
    }
    useEffect(() => {
        postService.listPost({
            take: TAKE,
            skip: pagination * TAKE,
        }).then((data) => {
            setPosts(data)
            setIsLoading(false)
        })
    }, [pagination])
    if(isLoading){
        return (
            <Loader isLoading={isLoading} />
        )  
    }

    if(posts.length == 0){
        const CreatePostButton = () => (
            <DefaultButton
                onSend={async () => { handleCreatePost() }}
                content="Создать пост"
                classNames="need-registration__button"
            />
        )

        return (
            <NoDataFound Button={CreatePostButton} />
        )
    }

    return (
        <section className={styles.postsPageContainer}>
            <div className = {styles.header}>
                <div className="slide-tab">
                    <div className="left">
                        <h2 className="section__title">
                            Публикации
                        </h2>
                    </div>
                </div>
            </div>
            <div className={`locations__wrapper blog ${styles.postsContainer}`}>
                { 
                    posts.map((post) => <PostCard key={post.id} {...post} />)
                }
            </div>
            <div className = {styles.paginationContainer}>
                <DefaultPagination 
                    paginationNumber={pagination + 1}
                    onPrevPage={() => setPagination(pagination - 1)}
                    onNextPage={() => { 
                        setPagination(pagination + 1)
                    }}
                    prevPageDisabled = { pagination ==  0 }
                    nextPageDisabled={ posts.length < TAKE }
                />
            </div>
        </section>
    )
}