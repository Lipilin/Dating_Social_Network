import { createEntityUpload } from '@/utils/multer/createEntityUpload.js'

const ANNOUNCEMENT_MULTIPART_JSON_FIELDS = [ 'announcement' ] as const

export const multerAnnouncementUpload = createEntityUpload(
    ANNOUNCEMENT_MULTIPART_JSON_FIELDS,
    [ { name: 'file', maxCount: 1 } ]
)
