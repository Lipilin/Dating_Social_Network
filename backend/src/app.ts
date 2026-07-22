import express from 'express'
export { prisma } from '@/prisma.js'
import { router as UserRouter } from '@/routes/user.routes.js'
import { router as CategoryRouter } from '@/routes/category.routes.js'
import { router as AdminRouter } from '@/admin/index.js'
export const app = express()
app.use(express.json())
app.use('/api', UserRouter)
app.use('/admin', AdminRouter)
app.use('/resources', express.static('./resources'))
app.use('/category', CategoryRouter)