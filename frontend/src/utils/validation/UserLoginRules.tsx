import { z } from 'zod'

export const UserLoginSchema = z.object({
    email: z.email({message: 'Неверный email!'}),
    password: z.string().min(8, {message: 'Пароль должен быть не менее 8 символов!'}),
})