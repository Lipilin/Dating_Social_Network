import { prisma } from '@/prisma.js'
import type { User } from '@prisma/client'
import { UserStatus, UserRole } from '@prisma/client'
import type { UserPostRequest, UserLoginRequest, UserLoginResponse } from '@boltaem/common/type.js'
import bcrypt from 'bcryptjs'
import { fromUserToUserResponse } from '@/utils/mapping/user.mapper.js'
import { GENDER } from '@boltaem/common/type.js'

export class UserService{
    async getUser(id: number): Promise<User | null>{
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

    async createUser(data: UserPostRequest): Promise<User | null> {
        try {
            const normalizedEmail = data.email.toLowerCase().trim()
            const normalizedLogin = data.login.toLowerCase().trim()
            const existingUser = await prisma.user.findFirst({
                where: {
                    OR: [
                        { 
                            email: normalizedEmail
                        },
                        {
                            login: normalizedLogin
                        }
                    ],
                },
            })

            if (existingUser) {
                return null
            }

            const hashedPassword = await bcrypt.hash(data.password, 10)

            const user = await prisma.user.create({
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

            return user
        } catch (error) {
            console.error(error)
            return null
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
        if(!user) throw new Error('No user found')
        const checkPassword = await bcrypt.compare(data.password, user.password)
        if(!checkPassword) throw new Error('Invalid password')
        const response = await fromUserToUserResponse(user)
        return response
    }
}