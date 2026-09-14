import { AUTH_ENV, AUTH_ERROR_MESSAGE } from '@/types.js'

const accessSecret = process.env[AUTH_ENV.ACCESS_TOKEN_SECRET]
const refreshSecret = process.env[AUTH_ENV.REFRESH_TOKEN_SECRET]
const emailConfirmationSecret = process.env[AUTH_ENV.EMAIL_CONFIRMATION_SECRET]
const passwordResetSecret = process.env[AUTH_ENV.PASSWORD_RESET_SECRET]

if (!accessSecret || !refreshSecret || !emailConfirmationSecret || !passwordResetSecret) {
    throw new Error(AUTH_ERROR_MESSAGE.NO_VALID_SECRETS)
}

export const encodedAccessSecret = new TextEncoder().encode(accessSecret)
export const encodedRefreshSecret = new TextEncoder().encode(refreshSecret)
export const encodedEmailConfirmationSecret = new TextEncoder().encode(emailConfirmationSecret)
export const encodedPasswordResetSecret = new TextEncoder().encode(passwordResetSecret)
