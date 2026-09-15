const uploadDir = process.env.UPLOAD_DIR

if (!uploadDir) {
    throw new Error('UPLOAD_DIR is not configured')
}

export const UPLOAD_DIR = uploadDir
export const PHOTOS_BASE_URL = '/resources/photos'
export const PHOTOS_MAX_FILE_SIZE = 1024 * 1024 * 5

export const PHOTOS_MIME_TYPES = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/gif',
    'image/webp',
    'image/svg+xml'
] as const
