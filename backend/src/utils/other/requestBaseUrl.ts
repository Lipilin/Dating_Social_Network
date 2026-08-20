import type { Request } from 'express'

export function getRequestBaseUrl(request: Request): string {
    const host = request.get('host')

    if (!host) {
        throw new Error('Не удалось определить домен запроса')
    }

    return `${request.protocol}://${host}`
}
