import axios from 'axios'
import { API_SETTINGS } from '@/config/apiSettings'
import {
    EMAIL_CONFIRMATION_SUCCESS_MESSAGE,
} from '@boltaem/common/config'

interface EmailConfirmationResponse {
    message: string
}

interface PasswordResetValidationResponse {
    email: string
}

export async function sendEmailConfirmation(token: string): Promise<EmailConfirmationResponse> {
    const response = await axios.get<EmailConfirmationResponse>(
        `${API_SETTINGS.API_HOST}/email/confirm/${encodeURIComponent(token)}`,
    )

    return response.data
}

export async function validatePasswordResetToken(
    token: string,
): Promise<PasswordResetValidationResponse> {
    const response = await axios.get<PasswordResetValidationResponse>(
        `${API_SETTINGS.API_HOST}/email/password-reset/${encodeURIComponent(token)}`,
    )

    return response.data
}

export { EMAIL_CONFIRMATION_SUCCESS_MESSAGE }
