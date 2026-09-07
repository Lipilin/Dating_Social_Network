import multer from 'multer'
import { PHOTOS_MAX_FILE_SIZE } from '@/config/photosConfig.js'
import { AUTH_ERROR_MESSAGE } from '@/types.js'
import { createEntityUpload } from '@/utils/multer/createEntityUpload.js'
import { userStorage, USER_MULTIPART_JSON_FIELDS } from '@/utils/multer/user/storage.js'

export const userMulter = multer({
    storage: userStorage,
    limits: {
        fileSize: PHOTOS_MAX_FILE_SIZE,
    },
})

export const multerUserUpload = createEntityUpload(
    userMulter,
    USER_MULTIPART_JSON_FIELDS,
    AUTH_ERROR_MESSAGE.MISSING_USER_ID,
)
