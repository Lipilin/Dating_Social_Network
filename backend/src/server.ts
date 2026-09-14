import { config } from 'dotenv'

config({ path: [ '../.env', '.env' ] })

const PORT = process.env.PORT || 3000

async function start() {
    const [ { app }, { admin } ] = await Promise.all([
        import('@/app.js'),
        import('@/admin/configs/adminConfig.js')
    ])

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
