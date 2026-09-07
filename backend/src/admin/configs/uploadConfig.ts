import uploadFeature from '@adminjs/upload'
import { Components, componentLoader } from '@/admin/configs/componentLoader.js'
import { CrossDeviceLocalProvider } from '@/admin/configs/localPhotosProvider.js'
import {
    PHOTOS_BASE_URL,
    PHOTOS_MIME_TYPES,
    PHOTOS_RELATIVE_PATH,
} from '@/config/photosConfig.js'

const photosProvider = new CrossDeviceLocalProvider({
    bucket: PHOTOS_RELATIVE_PATH,
    opts: {
        baseUrl: PHOTOS_BASE_URL,
    },
})

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
        validation: { mimeTypes: [...PHOTOS_MIME_TYPES] },
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

export function imagePreviewPropertyOverride(keyProperty: string) {
    const fileProperty = uploadFilePropertyName(keyProperty)

    return {
        [fileProperty]: {
            components: {
                list: Components.ImagePreview,
                show: Components.ImagePreview,
            },
        },
    }
}

export function imagePreviewPropertyOverrides(keyProperties: string[]) {
    return keyProperties.reduce<Record<string, object>>((acc, keyProperty) => ({
        ...acc,
        ...imagePreviewPropertyOverride(keyProperty),
    }), {})
}
