import { useParams } from 'react-router'
import { Post } from '@/utils/api/Post'
import { useState, useEffect } from 'react'
import { Loader } from '@/components/pages/Loader/Loader'

const postProvider = new Post()

export function PostDetail() {
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        async function getPost(){
            if(!id) return
            const post = await postProvider.getPost(id)
            setIsLoading(false)
        }
    }, [id])
    
    return (
        <Loader isLoading={isLoading} />
    )
}