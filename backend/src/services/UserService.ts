import { prisma } from '@/prisma.js'
import type { GenderPreference, User } from '@prisma/client'
import { UserStatus, UserRole } from '@prisma/client'
import type { UserPostRequest } from '@boltaem/common/type.js'
import bcrypt from 'bcryptjs'

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
                    //gender: data.gender as GenderPreference,
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
}