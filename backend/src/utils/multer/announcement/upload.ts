import multer from 'multer'
import { PHOTOS_MAX_FILE_SIZE } from '@/config/photosConfig.js'
import { ANNOUNCEMENT_ERROR_MESSAGE } from '@/config/announcementMessages.js'
import { createEntityUpload } from '@/utils/multer/createEntityUpload.js'
import {
    announcementStorage,
    ANNOUNCEMENT_MULTIPART_JSON_FIELDS,
} from '@/utils/multer/announcement/storage.js'

export const announcementMulter = multer({
    storage: announcementStorage,
    limits: {
        fileSize: PHOTOS_MAX_FILE_SIZE,
    },
})

export const multerAnnouncementUpload = createEntityUpload(
    announcementMulter,
    ANNOUNCEMENT_MULTIPART_JSON_FIELDS,
    ANNOUNCEMENT_ERROR_MESSAGE.MISSING_ANNOUNCEMENT_ID,
)
