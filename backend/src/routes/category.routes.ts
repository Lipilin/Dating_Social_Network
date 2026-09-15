import { Router } from 'express'
import { securityMiddlewareDefault } from '@/middleware/security.js'
import { CategoryController } from '@/controllers/CategoryController.js'
import { CategoryService } from '@/services/CategoryService.js'

const categorySerivce = new CategoryService()
const categoryController = new CategoryController(categorySerivce)
export const router = Router()
router.get('/list', categoryController.listCategories.bind(categoryController))