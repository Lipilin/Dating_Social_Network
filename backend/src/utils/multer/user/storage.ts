import type { Request } from 'express'
import { AUTH_ERROR_MESSAGE } from '@/types.js'
import { createPhotoStorage } from '@/utils/multer/createPhotoStorage.js'
import { normalizeMultipartBody } from '@/utils/multer/normalizeMultipartBody.js'

export const USER_MULTIPART_JSON_FIELDS = ['updatedUser'] as const

export function getUserEntityId(req: Request): number | null {
    normalizeMultipartBody(req, USER_MULTIPART_JSON_FIELDS)

    const updatedUser = req.body?.updatedUser
    if (!updatedUser?.id) {
        return null
    }

    return updatedUser.id
}

export const userStorage = createPhotoStorage(
    USER_MULTIPART_JSON_FIELDS,
    getUserEntityId,
    AUTH_ERROR_MESSAGE.MISSING_USER_ID,
)
