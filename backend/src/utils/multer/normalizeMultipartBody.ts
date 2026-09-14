import type { Request } from 'express'

export function normalizeMultipartBody(req: Request, jsonFields: readonly string[]): void {
    for (const field of jsonFields) {
        const value = req.body?.[field]

        if (typeof value !== 'string') {
            continue
        }

        try {
            req.body[field] = JSON.parse(value)
        } catch {
            
        }
    }
}
