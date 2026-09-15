import { ComponentLoader } from 'adminjs'

export const componentLoader = new ComponentLoader()

export const Components = {
    ImagePreview: componentLoader.add('ImagePreview', '../components/ImagePreview'),
}
