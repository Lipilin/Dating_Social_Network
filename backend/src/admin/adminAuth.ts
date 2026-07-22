import bcrypt from 'bcryptjs'
import { UserRole } from '@prisma/client'
import { UserStatus } from '@prisma/client'
import { prisma } from '@/app.js'

export async function adminAuth(email: string, password: string){
    const user = await prisma.user.findFirst({where: {
        role: UserRole.ADMIN, 
        status: UserStatus.REGISTERED, 
        email: email
    }})
    if(!user) return null
    const result = await bcrypt.compare(password, user.password)
    if(result) return { email }
    return null
}