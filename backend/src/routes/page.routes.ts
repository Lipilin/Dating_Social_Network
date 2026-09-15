import { Router } from "express"
import { PageController } from "@/controllers/PageController.js"
import { PageService } from "@/services/PageService.js"

export const router = Router()
const service = new PageService()
const controller = new PageController(service)
router.get('/list', controller.listPages.bind(controller))
router.get('/get', controller.getPageByAlias.bind(controller))
