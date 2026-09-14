import type { NextFunction, Request, Response } from 'express'
import multer from 'multer'
import { API_RESPONSE } from '@/types.js'
import {
    PHOTOS_MAX_FILE_SIZE,
    PHOTOS_MIME_TYPES
} from '@/config/photosConfig.js'
import { normalizeMultipartBody } from '@/utils/multer/normalizeMultipartBody.js'

export function createEntityUpload(
    jsonFields: readonly string[],
    fileFields: readonly multer.Field[]
) {
    const upload = multer({
        storage: multer.memoryStorage(),
        limits: {
            fileSize: PHOTOS_MAX_FILE_SIZE
        },
        fileFilter: (_req, file, callback) => {
            if (!PHOTOS_MIME_TYPES.includes(file.mimetype as typeof PHOTOS_MIME_TYPES[number])) {
                return callback(new Error('Недопустимый формат файла'))
            }

            callback(null, true)
        }
    }).fields([ ...fileFields ])

    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.is('multipart/form-data')) {
            return next()
        }

        upload(req, res, (error: unknown) => {
            if (error) {
                const message = error instanceof Error
                    ? error.message
                    : 'Ошибка загрузки файла'
                return res.status(API_RESPONSE.BAD_REQUEST).json({ message })
            }

            normalizeMultipartBody(req, jsonFields)
            next()
        })
    }
}
