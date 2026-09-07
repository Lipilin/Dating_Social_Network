import type { Request } from 'express'
import fs from 'fs'
import multer from 'multer'
import { getEntityPhotosDir } from '@/config/photosConfig.js'
import { normalizeMultipartBody } from '@/utils/multer/normalizeMultipartBody.js'

type GetEntityId = (req: Request) => number | null

export function createPhotoStorage(
    jsonFields: readonly string[],
    getEntityId: GetEntityId,
    missingIdError: string,
) {
    return multer.diskStorage({
        destination: (
            req: Request,
            _file: Express.Multer.File,
            cb: (error: Error | null, destination: string) => void,
        ) => {
            normalizeMultipartBody(req, jsonFields)

            const entityId = getEntityId(req)
            if (entityId === null) {
                return cb(new Error(missingIdError), '')
            }

            req.uploadEntityId = entityId
            const dir = getEntityPhotosDir(entityId)
            fs.mkdirSync(dir, { recursive: true })
            cb(null, dir)
        },
        filename: (
            req: Request,
            file: Express.Multer.File,
            cb: (error: Error | null, filename: string) => void,
        ) => {
            const entityId = req.uploadEntityId ?? getEntityId(req)
            if (entityId === null) {
                return cb(new Error(missingIdError), '')
            }

            cb(null, file.fieldname)
            req.body[file.fieldname] = `${entityId}/${file.fieldname}`
        },
    })
}
