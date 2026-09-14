import { Router } from "express"
import { PostController } from "@/controllers/PostController.js"
import { PostService } from "@/services/PostService.js"
import { authMiddleware } from "@/middleware/Auth.js"
import { multerPostUpload } from '@/utils/multer/post/upload.js'

export const router = Router()
const service = new PostService()
const controller = new PostController(service)
router.get('/list', controller.listPosts.bind(controller))
router.get('/get', controller.getPostById.bind(controller))
router.post('/create', authMiddleware, multerPostUpload, controller.createPost.bind(controller))
router.patch('/update', authMiddleware, multerPostUpload, controller.updatePost.bind(controller))
router.delete('/delete', authMiddleware, controller.deletePost.bind(controller))
