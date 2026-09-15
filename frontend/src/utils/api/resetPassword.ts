import axios from 'axios'
import { API_SETTINGS } from '@/config/apiSettings'
import type { ResetPasswordRequest, ResetPasswordResponse } from '@pick-me-up/common/type'

export async function resetPassword(request: ResetPasswordRequest): Promise<ResetPasswordResponse> {
    const response = await axios.post<ResetPasswordResponse>(
        `${API_SETTINGS.API_HOST}${API_SETTINGS.ENDPOINTS.USER.RESET_PASSWORD}`,
        request,
    )

    return response.data
}
