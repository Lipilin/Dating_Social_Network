import type { UserLoginResponse, UserResource, GENDER_PREFERENCE, GENDER } from "@boltaem/common/type.js"
import type { Prisma, User } from "@prisma/client"
import { SignJWT } from 'jose'

type UserWithRelations = Prisma.UserGetPayload<{
    include: {
        interests: {
            include: {
                category: true,
            }
        },
        announcements: true,
        posts: true
    }, 
}>

const accessSecret = process.env.ACCESS_TOKEN_GENERATION_SECRET
const refreshSecret = process.env.REFRESH_TOKEN_GENERATION_SECRET

if(!accessSecret || !refreshSecret) throw new Error('No valid tokens')
const encodedAccessSecret = new TextEncoder().encode(accessSecret)
const encodedRefreshSecret = new TextEncoder().encode(refreshSecret)

async function generateJwtToken(user: User, secret: Uint8Array, expirationTime: string){
    return await new SignJWT(
        { 
            id: user.id, 
            login: user.login,
        }
    )
    .setProtectedHeader({ alg: 'HS256' }).setExpirationTime(expirationTime).sign(secret)
}

export async function fromUserToUserResponse(user: UserWithRelations): Promise<UserLoginResponse>{
    const accessToken = await generateJwtToken(user, encodedAccessSecret, '5m')
    const refreshToken = await generateJwtToken(user, encodedRefreshSecret, '1d')
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
        gender: user.gender as GENDER,
        city: user.city,
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