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
    [key: string]: unknown,
}

export const ACCESS_TOKEN_EXPIRATION_MINUTES = 5
export const ACCESS_TOKEN_EXPIRATION_TIME = `${ ACCESS_TOKEN_EXPIRATION_MINUTES }m`
export const REFRESH_TOKEN_EXPIRATION_TIME = '1d'
export const REFRESH_TOKEN_REMEMBER_ME_EXPIRATION_TIME = '30d'
export const JWT_ALGORITHM = 'HS256'
export const ACCESS_TOKEN_COOKIE_NAME = 'accessToken'
export const REFRESH_TOKEN_COOKIE_NAME = 'refreshToken'
export const ACCESS_TOKEN_COOKIE_MAX_AGE = 1000 * 60 * ACCESS_TOKEN_EXPIRATION_MINUTES
export const REFRESH_TOKEN_COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 7

export const AUTH_ENV = {
    ACCESS_TOKEN_SECRET: 'ACCESS_TOKEN_GENERATION_SECRET',
    REFRESH_TOKEN_SECRET: 'REFRESH_TOKEN_GENERATION_SECRET',
} as const

export const AUTH_ERROR_MESSAGE = {
    NO_VALID_SECRETS: 'No valid tokens',
    NO_USER_FOUND: 'No user found',
    INVALID_PASSWORD: 'Invalid password',
    NO_TOKEN_PROVIDED: 'Unauthorized. No token provided',
} as const

export const AUTH_SUCCESS_MESSAGE = {
    LOGOUT: 'Successfully logged out',
} as const

export type RefreshTokenWithUser = Prisma.RefreshTokenGetPayload<{
    include: {
        user: true,
    },
}>