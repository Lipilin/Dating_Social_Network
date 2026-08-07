import { Router } from "express"
import { router as UserRouter } from '@/routes/user.routes.js'
import { router as CategoryRouter } from '@/routes/category.routes.js'
import { router as AnnouncementRouter} from '@/routes/announcement.routes.js'
import { router as PostRouter } from '@/routes/post.routes.js'

export const router = Router()

router.use('/user', UserRouter)
router.use('/category', CategoryRouter)
router.use('/announcement', AnnouncementRouter)
router.use('/post', PostRouter)