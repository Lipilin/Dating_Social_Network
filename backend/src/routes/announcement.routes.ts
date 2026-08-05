import { Router } from "express"
import { AnnouncementController } from "@/controllers/AnnouncementController.js"
import { AnnouncementService } from "@/services/AnnouncementService.js"

export const router = Router()
const service = new AnnouncementService()
const controller = new AnnouncementController(service)
router.get('/list', controller.getLastAnnouncements.bind(controller))
router.get('/get', controller.getAnnouncementById.bind(controller))