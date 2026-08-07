import uploadFeature from '@adminjs/upload'
import { componentLoader } from '@/admin/configs/componentLoader.js'
import { CrossDeviceLocalProvider } from '@/admin/configs/localPhotosProvider.js'

const photosDir = 'resources/photos'

const photosProvider = new CrossDeviceLocalProvider({
    bucket: photosDir,
    opts: {
        baseUrl: '/resources/photos',
    },
})

const imageMimeTypes = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/gif',
    'image/webp',
    'image/svg+xml',
]

export function createImageUpload(keyProperty: string, fileProperty: string) {
    return uploadFeature({
        componentLoader,
        provider: photosProvider,
        properties: {
            key: keyProperty,
            file: fileProperty,
            filePath: `${fileProperty}Path`,
            filesToDelete: `${fileProperty}ToDelete`,
        },
        validation: { mimeTypes: imageMimeTypes },
    })
}

export function hiddenKeyProperty() {
    return {
        isVisible: {
            edit: false,
            new: false,
            list: false,
            show: false,
            filter: false,
        },
    }
}

export function uploadFilePropertyName(keyProperty: string) {
    return `upload_${keyProperty}`
}
