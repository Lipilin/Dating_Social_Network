import { useParams } from 'react-router'
import type { Post as PostResource } from '@/utils/api/types'
import { Post } from '@/utils/api/Post'
import { useState, useEffect } from 'react'
import { Loader } from '@/components/pages/Loader/Loader'   
import { PostDetailContent } from './partials/PostDetailContent'
import { NotFound } from '../Errors/NotFound'

const postProvider = new Post()

export function PostDetail() {
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [post, setPost] = useState<PostResource | null>(null)
    useEffect(() => {
        async function getPost(){
            if(!id) return
            const post = await postProvider.getPost(id)
            setIsLoading(false)
            setPost(post)
        }
        getPost()
    }, [id])
    
    if(isLoading){
        return <Loader isLoading={isLoading} />
    }
    if(!post) return <NotFound />
    return (
        <PostDetailContent post = {post} />
    )
}