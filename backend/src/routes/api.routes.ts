import { Router } from "express"
import { router as UserRouter } from '@/routes/user.routes.js'
import { router as CategoryRouter } from '@/routes/category.routes.js'
import { router as AnnouncementRouter} from '@/routes/announcement.routes.js'
import { router as PostRouter } from '@/routes/post.routes.js'
import { router as PageRouter } from '@/routes/page.routes.js'
import { router as EmailNotificationRouter } from '@/routes/emailNotification.routes.js'
import { router as EmailRouter } from '@/routes/email.routes.js'

export const router = Router()

router.use('/user', UserRouter)
router.use('/category', CategoryRouter)
router.use('/announcement', AnnouncementRouter)
router.use('/post', PostRouter)
router.use('/page', PageRouter)
router.use('/email-notification', EmailNotificationRouter)
router.use('/email', EmailRouter)