import express from 'express'
export { prisma } from '@/prisma.js'
import { router as ApiRouter } from './routes/api.routes.js'
import { router as AdminRouter } from '@/admin/index.js'
import cors from 'cors'

export const app = express()
app.use(express.json())
app.get('/', (req, res) => {
    res.redirect('/admin')
})
app.use(cors())
app.use('/admin', AdminRouter)
app.use('/api', ApiRouter)
app.use('/resources', express.static('./resources'))