import fs from 'fs'
import path from 'path'
import { LocalProvider } from '@adminjs/upload'
import type { ActionContext, UploadedFile } from 'adminjs'

export class CrossDeviceLocalProvider extends LocalProvider {
    async upload(file: UploadedFile, key: string, _context?: ActionContext) {
        const filePath = process.platform === 'win32'
            ? this.path(key)
            : this.path(key).slice(1)

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
}
