import type { Request } from 'express'
import { POST_ERROR_MESSAGE } from '@/config/postMessages.js'
import { createPhotoStorage } from '@/utils/multer/createPhotoStorage.js'
import { normalizeMultipartBody } from '@/utils/multer/normalizeMultipartBody.js'

export const POST_MULTIPART_JSON_FIELDS = ['post'] as const

export function getPostEntityId(req: Request): number | null {
    normalizeMultipartBody(req, POST_MULTIPART_JSON_FIELDS)

    const id = req.body?.post?.id ?? req.body?.id
    if (id == null) {
        return null
    }

    const numericId = Number(id)
    if (!Number.isFinite(numericId)) {
        return null
    }

    return numericId
}

export const postStorage = createPhotoStorage(
    POST_MULTIPART_JSON_FIELDS,
    getPostEntityId,
    POST_ERROR_MESSAGE.MISSING_POST_ID,
)
