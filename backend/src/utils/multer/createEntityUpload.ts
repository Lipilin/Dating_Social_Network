import type { NextFunction, Request, Response } from 'express'
import type multer from 'multer'
import { API_RESPONSE } from '@/types.js'
import { normalizeMultipartBody } from '@/utils/multer/normalizeMultipartBody.js'

export function createEntityUpload(
    multerInstance: multer.Multer,
    jsonFields: readonly string[],
    missingIdError: string,
) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.is('multipart/form-data')) {
            return next()
        }

        multerInstance.any()(req, res, (error: unknown) => {
            if (error instanceof Error && error.message === missingIdError) {
                return res.status(API_RESPONSE.BAD_REQUEST).json({ message: error.message })
            }

            if (error) {
                return next(error)
            }

            normalizeMultipartBody(req, jsonFields)
            next()
        })
    }
}
