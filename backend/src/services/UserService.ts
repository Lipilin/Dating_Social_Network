import { prisma } from '@/prisma.js'
import type { Prisma, User } from '@prisma/client'
import { UserStatus, UserRole } from '@prisma/client'
import type { UserPostRequest, UserLoginRequest, UserLoginResponse } from '@boltaem/common/type.js'
import bcrypt from 'bcryptjs'
import { fromUserToUserResponse, type UserWithRelations } from '@/utils/mapping/user.mapper.js'
import { GENDER } from '@boltaem/common/type.js'
import { AUTH_ERROR_MESSAGE, type JwtFormat } from '@/types.js'
import { SERVER_ERRORS } from '@boltaem/common/config.js'

export class UserService{
    async getUser(id: number): Promise<UserWithRelations | null>{
        try{
            const entity = await prisma.user.findUnique({
                where: { id, status: UserStatus.REGISTERED }, 
                include: {
                    posts: true,
                    announcements: true,
                    interests: {
                        include: {
                            category: true
                        }
                    },
                }
            })
            return entity
        } catch (error) {
            console.error(error)
            return null
        }
    }

    async update(id: number, data: Prisma.UserUpdateInput): Promise<User | null> {
        data.lastSeen = new Date()
        try {
            const user = await prisma.user.update({
                where: { id: id, status: UserStatus.REGISTERED },
                include: {
                    interests: {
                        include: {
                            category: true
                        }
                    },
                    announcements: true,
                    posts: true
                }, 
                data,
            })
            return user
        } catch (error) {
            console.log(data)
            throw new Error(AUTH_ERROR_MESSAGE.UPDATE_USER_ERROR)
        }
    }

    async createUser(data: UserPostRequest): Promise<User> {
        const normalizedEmail = data.email.toLowerCase().trim()
        const normalizedLogin = data.login.toLowerCase().trim()
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: normalizedEmail },
                    { login: normalizedLogin },
                ],
            },
        })

        if (existingUser) {
            throw new Error(AUTH_ERROR_MESSAGE.USER_ALREADY_EXISTS)
        }

        const hashedPassword = await bcrypt.hash(data.password, 10)

        try {
            return await prisma.user.create({
                data: {
                    email: normalizedEmail,
                    login: normalizedLogin,
                    password: hashedPassword,
                    age: data.age,
                    name: data.name,
                    surname: data.surname,
                    description: data.description,
                    city: data.city,
                    gender: data.gender as GENDER,
                    interests: {
                        connect: data.interests?.map((interest) => ({ id: interest.id })) || [],
                    },
                    role: UserRole.USER,
                    status: UserStatus.NEW,
                },
            })
        } catch (error) {
            console.log(error)
            throw new Error(SERVER_ERRORS.REGISTRATION_ERROR)
        }
    }

    async login(data: UserLoginRequest): Promise<UserLoginResponse> {
        const user = await prisma.user.findFirst({
            where: {
                email: data.email,
                status: UserStatus.REGISTERED,
            },
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
        if(!user) throw new Error(AUTH_ERROR_MESSAGE.NO_USER_FOUND)
        const checkPassword = await bcrypt.compare(data.password, user.password)
        if(!checkPassword) throw new Error(AUTH_ERROR_MESSAGE.INVALID_PASSWORD)
        await this.update(user.id, { lastSeen: new Date() })
        user.lastSeen = new Date()
        const response = await fromUserToUserResponse(user)
        return response
    }

    async me(userId: number ): Promise<UserLoginResponse> {
        const user = await prisma.user.findUnique({
            where: { 
                id: userId,
                status: UserStatus.REGISTERED
            },
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
        if(!user) throw new Error(AUTH_ERROR_MESSAGE.NO_USER_FOUND)
        await this.update(user.id, { lastSeen: new Date() })
        user.lastSeen = new Date()
        return fromUserToUserResponse(user)
    }
}