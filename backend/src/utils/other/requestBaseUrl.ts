export function getAppBaseUrl(): string {
    const appHost = process.env.APP_HOST

    if (!appHost) {
        throw new Error('APP_HOST не задан')
    }

    return appHost.replace(/\/$/, '')
}
