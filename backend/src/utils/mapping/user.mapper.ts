import { fromAnnouncementToResource } from '../mapping/announcement.mapper.js'
import type { UserLoginResponse, UserResource, UserUpdatedRequest, GENDER } from '@boltaem/common/type.js'
import { Prisma } from '@prisma/client'
import { SignJWT } from 'jose'
import { encodedAccessSecret, encodedRefreshSecret } from '../other/authSecret.js'
import { PHOTOS_BASE_URL } from '@/config/photosConfig.js'
import {
    ACCESS_TOKEN_EXPIRATION_TIME,
    JWT_ALGORITHM,
    REFRESH_TOKEN_EXPIRATION_TIME,
    type JwtFormat,
} from '@/types.js'

export const userWithRelationsArgs = Prisma.validator<Prisma.UserDefaultArgs>()({
    include: {
        interests: {
            include: {
                category: true,
            }
        },
        announcements: true,
        posts: true
    }
})

export type UserWithRelations = Prisma.UserGetPayload<typeof userWithRelationsArgs> & { rememberMe: boolean }

type UserScalars = Pick<UserResource, 'gender' | 'city'>

export async function generateJwtToken(user: JwtFormat, secret: Uint8Array, expirationTime: string){
    const payload: JwtFormat = {
        id: user.id,
        login: user.login,
        rememberMe: user.rememberMe,
    }
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: JWT_ALGORITHM }).setExpirationTime(expirationTime).sign(secret)
}

export async function fromUserToUserResponse(user: UserWithRelations): Promise<UserLoginResponse>{
    const accessToken = await generateJwtToken(user, encodedAccessSecret, ACCESS_TOKEN_EXPIRATION_TIME)
    const refreshToken = await generateJwtToken(user, encodedRefreshSecret, REFRESH_TOKEN_EXPIRATION_TIME)
    const { gender, city } = user as unknown as UserScalars
    const userResource: UserResource = {
        id: user.id,
        email: user.email,
        name: user.name,
        surname: user.surname ?? '',
        description: user.description ?? '',
        avatar: user.avatar ?? '',
        banner: user.banner ?? '',
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        gender: gender,
        city: city,
        announcements: user.announcements.map((announcement) =>
            fromAnnouncementToResource({ ...announcement, user }),
        ),
        posts: user.posts.map((post) => {
            let tags: string[] = []
            try{
                tags = JSON.parse(post.tags as string)
            }catch(error){
                tags = []
            }

            return {
                id: post.id,
                title: post.title,
                content: post.content,
                image: post.image,
                tags: tags,
                createdAt: post.createdAt,
            }
        }),
        interests: user.interests.map((interest) => {
            return {
                id: interest.id,
                name: interest.name,
                image: interest.image ?? '',
                category: interest.category,
            }
        }),
        lastSeen: user.lastSeen ?? user.createdAt,
        age: user.age,
    }
    const response: UserLoginResponse = {
        user: userResource,
        accessToken: accessToken,
        refreshToken: refreshToken,
    }
    return response
}

export type UserMultipartBody = UserUpdatedRequest & {
    avatarFile?: string
    bannerFile?: string
}

export function fromUserUpdatedRequestToUserResource(body: UserMultipartBody): UserResource {
    const user: UserResource = { ...body.updatedUser }

    if (body.avatarFile) {
        user.avatar = `${PHOTOS_BASE_URL}/${body.avatarFile}`
    }

    if (body.bannerFile) {
        user.banner = `${PHOTOS_BASE_URL}/${body.bannerFile}`
    }

    return user
}

export function fromUserResourceToUserUpdateInput(user: UserResource): Prisma.UserUpdateInput{
    const userUpdateInput: Prisma.UserUpdateInput = {
        name: user.name,
        surname: user.surname,
        description: user.description,
        gender: user.gender,
        city: user.city,
        age: user.age,
    }

    if (user.avatar !== undefined) {
        userUpdateInput.avatar = user.avatar
    }

    if (user.banner !== undefined) {
        userUpdateInput.banner = user.banner
    }

    userUpdateInput.interests = {
        set: user?.interests?.map((interest) => ({id: interest.id})) ?? [],
    }
    return userUpdateInput
}