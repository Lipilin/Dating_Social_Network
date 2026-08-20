import { SignJWT, jwtVerify } from 'jose'
import {
    EMAIL_CONFIRMATION_ERROR_MESSAGE,
    EMAIL_CONFIRMATION_EXPIRATION_TIME,
    JWT_ALGORITHM,
} from '@/types.js'
import { encodedEmailConfirmationSecret } from './authSecret.js'

export interface EmailConfirmationPayload {
    email: string
    name: string
    login: string
    expiresAt: string
}

const EMAIL_CONFIRMATION_TTL_MS = 24 * 60 * 60 * 1000

export async function generateEmailConfirmationToken(
    email: string,
    name: string,
    login: string,
): Promise<string> {
    const expiresAt = new Date(Date.now() + EMAIL_CONFIRMATION_TTL_MS).toISOString()

    return new SignJWT({ email, name, login, expiresAt })
        .setProtectedHeader({ alg: JWT_ALGORITHM })
        .setExpirationTime(EMAIL_CONFIRMATION_EXPIRATION_TIME)
        .sign(encodedEmailConfirmationSecret)
}

export async function verifyEmailConfirmationToken(token: string): Promise<EmailConfirmationPayload> {
    try {
        const { payload } = await jwtVerify(token, encodedEmailConfirmationSecret)
        const emailConfirmation = payload as unknown as EmailConfirmationPayload

        if (
            !emailConfirmation.email
            || !emailConfirmation.name
            || !emailConfirmation.login
            || !emailConfirmation.expiresAt
        ) {
            throw new Error(EMAIL_CONFIRMATION_ERROR_MESSAGE.INVALID_TOKEN)
        }

        if (new Date(emailConfirmation.expiresAt).getTime() < Date.now()) {
            throw new Error(EMAIL_CONFIRMATION_ERROR_MESSAGE.EXPIRED_TOKEN)
        }

        return emailConfirmation
    } catch (error) {
        if (error instanceof Error) {
            const knownMessages = new Set(Object.values(EMAIL_CONFIRMATION_ERROR_MESSAGE))

            if (knownMessages.has(error.message as typeof EMAIL_CONFIRMATION_ERROR_MESSAGE[keyof typeof EMAIL_CONFIRMATION_ERROR_MESSAGE])) {
                throw error
            }
        }

        throw new Error(EMAIL_CONFIRMATION_ERROR_MESSAGE.INVALID_TOKEN)
    }
}

export function buildEmailConfirmationLink(token: string): string {
    const appUrl = process.env.APP_URL?.replace(/\/$/, '') ?? 'http://localhost:3000'
    return `${appUrl}/api/email/confirm/${encodeURIComponent(token)}`
}
