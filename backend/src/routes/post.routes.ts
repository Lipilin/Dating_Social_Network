import { Router } from "express"
import { PostController } from "@/controllers/PostController.js"
import { PostService } from "@/services/PostService.js"
import { authMiddleware } from "@/middleware/Auth.js"

export const router = Router()
const service = new PostService()
const controller = new PostController(service)
router.get('/list', controller.listPosts.bind(controller))
router.get('/get', controller.getPostById.bind(controller))
router.post('/create', authMiddleware, controller.createPost.bind(controller))
router.patch('/update', authMiddleware, controller.updatePost.bind(controller))
