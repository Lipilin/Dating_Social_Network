import express from 'express'
import helmet from 'helmet'
export const app = express()

app.use(helmet())
app.use(express.json())

//app.use('/admin', )