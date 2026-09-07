import multer from 'multer'
import { PHOTOS_MAX_FILE_SIZE } from '@/config/photosConfig.js'
import { POST_ERROR_MESSAGE } from '@/config/postMessages.js'
import { createEntityUpload } from '@/utils/multer/createEntityUpload.js'
import { postStorage, POST_MULTIPART_JSON_FIELDS } from '@/utils/multer/post/storage.js'

export const postMulter = multer({
    storage: postStorage,
    limits: {
        fileSize: PHOTOS_MAX_FILE_SIZE,
    },
})

export const multerPostUpload = createEntityUpload(
    postMulter,
    POST_MULTIPART_JSON_FIELDS,
    POST_ERROR_MESSAGE.MISSING_POST_ID,
)
