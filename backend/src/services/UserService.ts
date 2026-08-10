import { prisma } from '@/prisma.js'
import type { GenderPreference, User } from '@prisma/client'
import { UserStatus } from '@prisma/client'
import bcrypt from 'bcryptjs'

export interface CreateUserData {
    login: string
    email: string
    password: string
    name: string
    surname: string
    age: number
    city: string
    description: string
    gender?: string
    interests?: { id: string }[]
}

export class UserService{
    async getUser(id: string): Promise<User | null>{
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

    async createUser(data: CreateUserData): Promise<User | null> {
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
                    gender: data.gender as GenderPreference,
                    interests: {
                        connect: data.interests?.map((interest) => ({ id: interest.id })) || [],
                    },
                },
            })

            return user
        } catch (error) {
            console.error(error)
            return null
        }
    }
}