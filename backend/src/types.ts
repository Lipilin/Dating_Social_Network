import type { Prisma } from '@prisma/client'
export enum API_RESPONSE{
    OK = 200, 
    ERROR = 500,
    BAD_REQUEST = 400, 
    NOT_FOUND = 404,
    UNAUTHORIZED = 401,
}

export interface JwtFormat{
    id: number, 
    login: string, 
    rememberMe: boolean,
    [key: string]: unknown,
}

export const ACCESS_TOKEN_EXPIRATION_MINUTES = 5
export const ACCESS_TOKEN_EXPIRATION_TIME = `${ ACCESS_TOKEN_EXPIRATION_MINUTES }m`
export const REFRESH_TOKEN_EXPIRATION_TIME = '1d'
export const REFRESH_TOKEN_REMEMBER_ME_EXPIRATION_TIME = '30d'
export const EMAIL_CONFIRMATION_EXPIRATION_TIME = '1d'
export const PASSWORD_RESET_EXPIRATION_TIME = '1h'
export const PASSWORD_RESET_TTL_MS = 60 * 60 * 1000
export const JWT_ALGORITHM = 'HS256'
export const ACCESS_TOKEN_COOKIE_NAME = 'accessToken'
export const REFRESH_TOKEN_COOKIE_NAME = 'refreshToken'
export const ACCESS_TOKEN_COOKIE_MAX_AGE = 1000 * 60 * ACCESS_TOKEN_EXPIRATION_MINUTES
export const REFRESH_TOKEN_COOKIE_MAX_AGE = 1000 * 60 * 60 * 24
export const REFRESH_TOKEN_COOKIE_REMEMBER_ME_MAX_AGE = 1000 * 60 * 60 * 24 * 30;

export const AUTH_ENV = {
    ACCESS_TOKEN_SECRET: 'ACCESS_TOKEN_GENERATION_SECRET',
    REFRESH_TOKEN_SECRET: 'REFRESH_TOKEN_GENERATION_SECRET',
    EMAIL_CONFIRMATION_SECRET: 'EMAIL_CONFIRMATION_TOKEN_SECRET',
    PASSWORD_RESET_SECRET: 'PASSWORD_RESET_TOKEN_SECRET',
} as const

import {
    EMAIL_CONFIRMATION_ERROR_MESSAGE,
    EMAIL_CONFIRMATION_SUCCESS_MESSAGE,
    PASSWORD_RESET_ERROR_MESSAGE,
    PASSWORD_RESET_SUCCESS_MESSAGE,
    SERVER_ERRORS,
} from '@pick-me-up/common/config.js'

export {
    EMAIL_CONFIRMATION_ERROR_MESSAGE,
    EMAIL_CONFIRMATION_SUCCESS_MESSAGE,
    PASSWORD_RESET_ERROR_MESSAGE,
    PASSWORD_RESET_SUCCESS_MESSAGE,
}

export const AUTH_ERROR_MESSAGE = {
    NO_VALID_SECRETS: 'Не установлены валидные секреты',
    NO_USER_FOUND: 'Пользователь не найден',
    UPDATE_USER_ERROR: 'Ошибка при обновлении пользователя',
    INVALID_PASSWORD: SERVER_ERRORS.LOGIN_FAILED,
    NO_TOKEN_PROVIDED: 'Не авторизован. Нет токена',
    MISSING_USER_ID: 'Не авторизован. ID пользователя не передан',
    USER_ALREADY_EXISTS: SERVER_ERRORS.USER_ALREADY_EXISTS,
    REGISTRATION_ERROR: SERVER_ERRORS.REGISTRATION_ERROR,
} as const

export const AUTH_SUCCESS_MESSAGE = {
    LOGOUT: 'Успешный выход из аккаунта',   
    LOGIN: 'Успешный вход в аккаунт',
    UPDATE_USER: 'Пользователь успешно обновлен',
} as const

export type RefreshTokenWithUser = Prisma.RefreshTokenGetPayload<{
    include: {
        user: true,
    },
}>