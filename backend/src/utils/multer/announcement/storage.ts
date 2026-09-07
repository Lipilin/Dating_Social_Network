import type { Request } from 'express'
import { ANNOUNCEMENT_ERROR_MESSAGE } from '@/config/announcementMessages.js'
import { createPhotoStorage } from '@/utils/multer/createPhotoStorage.js'
import { normalizeMultipartBody } from '@/utils/multer/normalizeMultipartBody.js'

export const ANNOUNCEMENT_MULTIPART_JSON_FIELDS = ['announcement'] as const

export function getAnnouncementEntityId(req: Request): number | null {
    normalizeMultipartBody(req, ANNOUNCEMENT_MULTIPART_JSON_FIELDS)

    const id = req.body?.announcement?.id ?? req.body?.id
    if (id == null) {
        return null
    }

    const numericId = Number(id)
    if (!Number.isFinite(numericId)) {
        return null
    }

    return numericId
}

export const announcementStorage = createPhotoStorage(
    ANNOUNCEMENT_MULTIPART_JSON_FIELDS,
    getAnnouncementEntityId,
    ANNOUNCEMENT_ERROR_MESSAGE.MISSING_ANNOUNCEMENT_ID,
)
