import { AUTH_ENV, AUTH_ERROR_MESSAGE } from '@/types.js'

const accessSecret = process.env[AUTH_ENV.ACCESS_TOKEN_SECRET]
const refreshSecret = process.env[AUTH_ENV.REFRESH_TOKEN_SECRET]

if(!accessSecret || !refreshSecret) throw new Error(AUTH_ERROR_MESSAGE.NO_VALID_SECRETS)
export const encodedAccessSecret = new TextEncoder().encode(accessSecret)
export const encodedRefreshSecret = new TextEncoder().encode(refreshSecret)