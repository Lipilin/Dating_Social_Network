import type { NextFunction, Request, Response } from 'express'
import fs from 'fs'
import multer from 'multer'
import { getUserPhotosDir, PHOTOS_MAX_FILE_SIZE } from '@/config/photosConfig.js'
import { API_RESPONSE, AUTH_ERROR_MESSAGE } from '@/types.js'

const MULTIPART_JSON_FIELDS = ['updatedUser'] as const

function normalizeMultipartBody(req: Request): void {
    for (const field of MULTIPART_JSON_FIELDS) {
        const value = req.body?.[field]

        if (typeof value !== 'string') {
            continue
        }

        try {
            req.body[field] = JSON.parse(value)
        } catch {
            
        }
    }
}

function getUpdatedUserId(req: Request): number | null {
    normalizeMultipartBody(req)

    const updatedUser = req.body?.updatedUser
    if (!updatedUser) {
        return null
    }

    if (!updatedUser.id) {
        return null
    }

    return updatedUser.id
}

const storage = multer.diskStorage({
    destination: (
        req: Request,
        _file: Express.Multer.File,
        cb: (error: Error | null, destination: string) => void,
    ) => {
        const userId = getUpdatedUserId(req)
        if (userId === null) {
            return cb(new Error(AUTH_ERROR_MESSAGE.MISSING_USER_ID), '')
        }

        req.uploadUserId = userId
        const dir = getUserPhotosDir(userId)
        fs.mkdirSync(dir, { recursive: true })
        cb(null, dir)
    },
    filename: (
        req: Request,
        file: Express.Multer.File,
        cb: (error: Error | null, filename: string) => void,
    ) => {
        const userId = getUpdatedUserId(req)
        if (userId === null) {
            return cb(new Error(AUTH_ERROR_MESSAGE.MISSING_USER_ID), '')
        }

        const name = `${Date.now()}-${file.originalname}`
        cb(null, name)
        req.body[file.fieldname] = `${userId}/${name}`
    },
})

export const multerSettings = multer({
    storage,
    limits: {
        fileSize: PHOTOS_MAX_FILE_SIZE,
    },
})

export function multerUserUpload(req: Request, res: Response, next: NextFunction) {
    if (!req.is('multipart/form-data')) {
        return next()
    }

    multerSettings.any()(req, res, (error: unknown) => {
        if (error instanceof Error && error.message === AUTH_ERROR_MESSAGE.MISSING_USER_ID) {
            return res.status(API_RESPONSE.BAD_REQUEST).json({ message: error.message })
        }

        if (error) {
            return next(error)
        }

        normalizeMultipartBody(req)
        next()
    })
}
