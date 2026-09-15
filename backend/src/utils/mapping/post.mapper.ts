import type { PostResource } from '@pick-me-up/common/type.js'

export interface PostMultipartBody {
    post?: Partial<PostResource> & { id?: number }
    id?: number
    title?: string
    content?: string
    image?: string
    tags?: string[]
    createdAt?: Date | string
}

export function fromPostRequestBodyToPostResource(body: PostMultipartBody): PostResource {
    const source = body.post ?? body
    const id = Number(source.id ?? body.id)
    const createdAt = source.createdAt ?? body.createdAt

    const postResource: PostResource = {
        id,
        title: source.title ?? body.title ?? '',
        content: source.content ?? body.content ?? '',
        image: source.image ?? body.image ?? '',
        tags: source.tags ?? body.tags ?? [],
        createdAt: createdAt ? new Date(createdAt) : new Date(),
    }

    return postResource
}

export function fromPostResourceToCreateInput(resource: PostResource) {
    return {
        title: resource.title,
        content: resource.content,
        image: resource.image,
        tags: resource.tags ?? [],
    }
}
