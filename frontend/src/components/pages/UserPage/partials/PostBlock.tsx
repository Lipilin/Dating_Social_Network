import type { UserResource } from '@/utils/api/types'
import { Post } from './Post'

export function PostBlock({ user }: { user: UserResource }) {
    return (
        <div className="locations__wrapper blog">
            {user.posts.map((post, index) => (
                <Post key={post.id} {...post} imageIndex={index} />
            ))}
        </div>
    )
}
