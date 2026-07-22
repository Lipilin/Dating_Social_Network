import { adminAuth } from '@/admin/adminAuth.js'
import { admin } from '@/admin/configs/adminConfig.js'
import { securityMiddlewareAdmin } from '@/middleware/security.js'
import AdminJSExpress from '@adminjs/express'

export const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
        authenticate: adminAuth,
        cookiePassword: process.env.ADMIN_COOKIE_SECRET || 'secret-cookie-password',
    },
    null,
    {
    secret: process.env.SESSION_SECRET || 'session-secret',
        resave: false,
        saveUninitialized: true,
    }
)
adminRouter.use(securityMiddlewareAdmin)