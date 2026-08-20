import type { UserLoginResponse, UserResource, GENDER_PREFERENCE, GENDER } from '@boltaem/common/type.js'
import { Prisma } from '@prisma/client'
import type { User } from '@prisma/client'
import { SignJWT } from 'jose'
import { encodedAccessSecret, encodedRefreshSecret } from '../other/authSecret.js'
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

export type UserWithRelations = Prisma.UserGetPayload<typeof userWithRelationsArgs>

type UserScalars = Pick<UserResource, 'gender' | 'city'>

export async function generateJwtToken(user: JwtFormat, secret: Uint8Array, expirationTime: string){
    const payload: JwtFormat = {
        id: user.id,
        login: user.login,
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
        announcements: user.announcements.map((announcement) => {
            return {
                id: announcement.id,
                title: announcement.title ?? '',
                userAge: user.age,
                genderInterest: announcement.genderInterest as GENDER_PREFERENCE,        
                description: announcement.description ?? '',
                dateFrom: announcement.dateFrom.toISOString(),
                dateTo: announcement.dateTo.toISOString(),
                destination: announcement.destination ?? '',
                departure: announcement.departure ?? '',
                icon: announcement.icon ?? '',
                createdAt: announcement.createdAt.toISOString(),
            }
        }),
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

export function fromUserResourceToUserUpdateInput(user: UserResource): Prisma.UserUpdateInput{
    const userUpdateInput: Prisma.UserUpdateInput = {
        name: user.name,
        surname: user.surname,
        description: user.description,
        gender: user.gender,
        city: user.city,
        age: user.age,
    }
    userUpdateInput.interests = {
        set: user?.interests?.map((interest) => ({id: interest.id})) ?? [],
    }
    return userUpdateInput
}