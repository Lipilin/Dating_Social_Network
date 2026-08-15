import { useState, useEffect } from 'react'
import { Post } from "@/utils/api/Post"
import type { Post as PostResource } from '@boltaem/common/type'
import { DefaultPagination } from '@/components/ui/pagination/DefaultPagination'
import { Loader } from '@/components/pages/Loader/Loader'
import { NoDataFound } from '../Errors/NoDataFound'
import { DefaultButton } from '@/components/ui/buttons/DefaultButton'
import styles from './PostsPage.module.scss'
import { Post as PostCard} from '@/components/pages/UserPage/partials/Post'

const TAKE: number = 12
const postService = new Post()

export function PostsPage() {
    const [posts, setPosts] = useState<PostResource[]>([])
    const [pagination, setPagination] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setIsLoading(true)
        async function getPosts(){
            const posts = await postService.listPost({
                take: TAKE,
                skip: pagination * TAKE,
            })
            setPosts(posts)
            setIsLoading(false)
        }
        getPosts()
    }, [pagination])
    if(isLoading){
        return <Loader isLoading={isLoading} />    
    }

    if(posts.length == 0){
        const button = () => {
            return <DefaultButton onSend={async () => { await console.log('send') }} 
                content="Создать пост" 
                classNames="need-registration__button" />
        }
        return <NoDataFound Button={button} />
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
            <div className = { styles.postsContainer }>
                { 
                    posts.map((post) => <PostCard key={post.id} {...post} />)
                }
            </div>
            <div className = {styles.paginationContainer}>
                <DefaultPagination 
                    paginationNumber={pagination + 1}
                    onPrevPage={() => setPagination(pagination - 1)}
                    onNextPage={() => setPagination(pagination + 1)}
                    prevPageDisabled = { pagination ==  0 }
                    nextPageDisabled={ posts.length < TAKE }
                />
            </div>
        </section>
    )
}