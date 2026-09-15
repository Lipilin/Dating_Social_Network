import { SignJWT, jwtVerify } from 'jose'
import {
    JWT_ALGORITHM,
    PASSWORD_RESET_ERROR_MESSAGE,
    PASSWORD_RESET_EXPIRATION_TIME,
    PASSWORD_RESET_TTL_MS,
} from '@/types.js'
import { encodedPasswordResetSecret } from './authSecret.js'

export interface PasswordResetPayload {
    email: string
    id: number
    login: string
    expiresAt: string
}

export async function generatePasswordResetToken(
    email: string,
    id: number,
    login: string,
): Promise<string> {
    const expiresAt = new Date(Date.now() + PASSWORD_RESET_TTL_MS).toISOString()

    return new SignJWT({ email, id, login, expiresAt })
        .setProtectedHeader({ alg: JWT_ALGORITHM })
        .setExpirationTime(PASSWORD_RESET_EXPIRATION_TIME)
        .sign(encodedPasswordResetSecret)
}

export async function verifyPasswordResetToken(token: string): Promise<PasswordResetPayload> {
    try {
        const { payload } = await jwtVerify(token, encodedPasswordResetSecret)
        const passwordReset = payload as unknown as PasswordResetPayload

        if (
            !passwordReset.email
            || !passwordReset.id
            || !passwordReset.login
            || !passwordReset.expiresAt
        ) {
            throw new Error(PASSWORD_RESET_ERROR_MESSAGE.INVALID_TOKEN)
        }

        if (new Date(passwordReset.expiresAt).getTime() < Date.now()) {
            throw new Error(PASSWORD_RESET_ERROR_MESSAGE.EXPIRED_TOKEN)
        }

        return passwordReset
    } catch (error) {
        if (error instanceof Error) {
            const knownMessages = new Set(Object.values(PASSWORD_RESET_ERROR_MESSAGE))

            if (knownMessages.has(error.message as typeof PASSWORD_RESET_ERROR_MESSAGE[keyof typeof PASSWORD_RESET_ERROR_MESSAGE])) {
                throw error
            }
        }

        throw new Error(PASSWORD_RESET_ERROR_MESSAGE.INVALID_TOKEN)
    }
}

