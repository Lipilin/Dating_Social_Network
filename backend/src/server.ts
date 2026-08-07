import { app } from '@/app.js'
import { admin } from '@/admin/configs/adminConfig.js'
import { config } from 'dotenv'

config()

const PORT = process.env.PORT || 3000

async function start() {
    if (process.env.NODE_ENV === 'production') {
        await admin.initialize()
    } else {
        await admin.watch()
    }

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`)
    })
}

start().catch((error) => {
    console.error('Failed to start server:', error)
    process.exit(1)
})
