import express from 'express'
import helmet from 'helmet'
import { router as UserRouter } from '@/routes/user.routes.js'
export const app = express()

app.use(helmet())
app.use(express.json())
app.use('/api', UserRouter)