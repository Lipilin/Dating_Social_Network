import { EMAIL_NOTIFICATIONS_URLS } from '@boltaem/common/config.js'
import { getAppBaseUrl } from './requestBaseUrl.js'

type EmailNotificationUrlKey = keyof typeof EMAIL_NOTIFICATIONS_URLS

export function buildEmailNotificationLink(
    notificationUrlKey: EmailNotificationUrlKey,
    token: string,
): string {
    const appHost = getAppBaseUrl()
    const path = EMAIL_NOTIFICATIONS_URLS[notificationUrlKey]

    return `${appHost}${path}/${encodeURIComponent(token)}`
}
