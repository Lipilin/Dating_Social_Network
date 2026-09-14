import { createEntityUpload } from '@/utils/multer/createEntityUpload.js'

const USER_MULTIPART_JSON_FIELDS = [ 'updatedUser' ] as const

export const multerUserUpload = createEntityUpload(
    USER_MULTIPART_JSON_FIELDS,
    [
        { name: 'avatarFile', maxCount: 1 },
        { name: 'bannerFile', maxCount: 1 }
    ]
)
