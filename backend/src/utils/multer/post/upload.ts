import { createEntityUpload } from '@/utils/multer/createEntityUpload.js'

const POST_MULTIPART_JSON_FIELDS = [ 'post' ] as const

export const multerPostUpload = createEntityUpload(
    POST_MULTIPART_JSON_FIELDS,
    [ { name: 'file', maxCount: 1 } ]
)
