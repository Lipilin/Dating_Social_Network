import path from 'path'
import { mkdir, writeFile } from 'fs/promises'
import {
    PHOTOS_BASE_URL,
    UPLOAD_DIR
} from '@/config/photosConfig.js'

export type PhotoEntity = 'users' | 'posts' | 'announcements'

export async function saveUploadedPhoto(
    file: Express.Multer.File,
    entity: PhotoEntity,
    entityId: number,
    filename: string
): Promise<string> {
    const entityPath = `${entity}/${entityId}`
    const directory = path.join(UPLOAD_DIR, entityPath)

    await mkdir(directory, { recursive: true })
    await writeFile(path.join(directory, filename), file.buffer)

    return `${PHOTOS_BASE_URL}/${entityPath}/${filename}`
}

export function getUploadedFile(
    request: Express.Request,
    fieldName: string
): Express.Multer.File | undefined {
    const files = request.files

    if (!files) {
        return undefined
    }

    if (Array.isArray(files)) {
        return files.find((file) => file.fieldname === fieldName)
    }

    return files[fieldName]?.[0]
}
