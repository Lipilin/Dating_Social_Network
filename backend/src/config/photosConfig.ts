import path from 'path'
import { fileURLToPath } from 'url'

export const RESOURCES_DIR = 'resources'
export const PHOTOS_DIR = 'photos'
export const PHOTOS_RELATIVE_PATH = `${RESOURCES_DIR}/${PHOTOS_DIR}`
export const PHOTOS_BASE_URL = `/${PHOTOS_RELATIVE_PATH}`
export const PHOTOS_MAX_FILE_SIZE = 1024 * 1024 * 5

export const PHOTOS_MIME_TYPES = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/gif',
    'image/webp',
    'image/svg+xml',
] as const

const projectRoot = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '..',
    '..',
)

export function getPhotosDir(): string {
    return path.join(projectRoot, PHOTOS_RELATIVE_PATH)
}

export function getUserPhotosDir(userId: number | string): string {
    return path.join(getPhotosDir(), String(userId))
}
