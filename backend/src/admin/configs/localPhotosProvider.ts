import fs from 'fs'
import path from 'path'
import { LocalProvider } from '@adminjs/upload'
import type { ActionContext, UploadedFile } from 'adminjs'
import { PHOTOS_BASE_URL } from '@/config/photosConfig.js'

export class CrossDeviceLocalProvider extends LocalProvider {
    async upload(file: UploadedFile, key: string, _context?: ActionContext) {
        const filePath = this.#storagePath(key)

        await fs.promises.mkdir(path.dirname(filePath), { recursive: true })

        try {
            await fs.promises.rename(file.path, filePath)
        } catch (error) {
            const err = error as NodeJS.ErrnoException
            if (err.code !== 'EXDEV') {
                throw error
            }

            await fs.promises.copyFile(file.path, filePath)
            await fs.promises.unlink(file.path)
        }
    }

    async delete(key: string, bucket: string, _context?: ActionContext) {
        if (/^https?:\/\//.test(key)) return

        const filePath = this.#storagePath(key, bucket)
        if (fs.existsSync(filePath)) {
            await fs.promises.unlink(filePath)
        }
    }

    path(key: string): string {
        if (key.startsWith('/') || /^https?:\/\//.test(key)) {
            return key
        }

        return `${PHOTOS_BASE_URL}/${key}`
    }

    #storagePath(key: string, bucket = this.bucket): string {
        const relativeKey = key.startsWith(`${PHOTOS_BASE_URL}/`)
            ? key.slice(PHOTOS_BASE_URL.length + 1)
            : key.replace(/^\/+/, '')
        const root = path.resolve(bucket)
        const filePath = path.resolve(root, relativeKey)

        if (filePath !== root && !filePath.startsWith(`${root}${path.sep}`)) {
            throw new Error('Недопустимый путь файла')
        }

        return filePath
    }
}
