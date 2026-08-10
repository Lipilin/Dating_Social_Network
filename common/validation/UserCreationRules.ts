import { z } from 'zod'

export const LoginStepSchema = z.object({
    login: z.string().min(3, {message: 'Логин должен быть не менее 3 символов!'}), 
    email: z.email({message: 'Неверный email!'}), 
    password: z.string().min(8, {message: 'Пароль должен быть не менее 8 символов!'}),
    confirmPassword: z.string(), 
    acceptSecurity: z.boolean().refine((data) => data == true, {message: 'Вы должны согласиться с политикой обработки персональных данных!'}),
    acceptService: z.boolean().refine((data) => data == true, {message: 'Вы должны согласиться с правилами сервиса!'}),
}).refine((data) => data.password == data.confirmPassword, {
    message: 'Пароли не совпадают!',
    path: ['confirmPassword'],
})

export const InfoStepSchema = z.object({
    name: z.string().min(3, {message: 'Имя должно быть не менее 3 символов!'}),
    surname: z.string().min(3, {message: 'Фамилия должна быть не менее 3 символов!'}),
    age: z.number().min(18, {message: 'Возраст должен быть не менее 18 лет!'}),
    city: z.string().min(3, {message: 'Город должен быть не менее 3 символов!'}),
    description: z.string().max(255, {message: 'Описание должно быть не более 255 символов!'}),
})