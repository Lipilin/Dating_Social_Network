import AdminJS, { type ActionRequest } from 'adminjs'
import { Database, Resource, getModelByName } from '@adminjs/prisma'
import { ruLocale } from '@/admin/configs/locales/ruLocales.js'
import { componentLoader } from '@/admin/configs/componentLoader.js'
import {
    createImageUpload,
    hiddenKeyProperty,
    uploadFilePropertyName,
} from '@/admin/configs/uploadConfig.js'
import bcrypt from 'bcryptjs'
import { prisma } from '@/prisma.js'

AdminJS.registerAdapter({ Database, Resource })

export const admin = new AdminJS({
    componentLoader,
    branding: {
        companyName: 'Boltaem Admin',
        logo: '/resources/header_logo.svg'
    },
    resources: [
        {
            resource: { model: getModelByName('User'), client: prisma },
            options: {
                titleProperty: 'email',
                listProperties: [ 'id', 'email', 'login', 'name', 'role', 'status', uploadFilePropertyName('avatar'), 'createdAt' ],
                editProperties: [
                    'email',
                    'login',
                    'password',
                    'name',
                    'surname',
                    'description',
                    'status',
                    'role',
                    uploadFilePropertyName('avatar'),
                    uploadFilePropertyName('banner'),
                ],
                actions: {
                    new: {
                        before: async(request: ActionRequest) => {
                            if (request.payload && request.payload.password) {
                                request.payload.password = await bcrypt.hash(request.payload.password, 10)
                            }
                            return request
                        }
                    }
                },
                properties: {
                    password: {
                        type: 'password',
                        isVisible: {
                            new: true,
                            edit: false,
                            show: false,
                            list: false,
                            filter: false
                        }
                    },
                    avatar: hiddenKeyProperty(),
                    banner: hiddenKeyProperty(),
                    metadata: { type: 'json' }
                }
            },
            features: [
                createImageUpload('avatar', uploadFilePropertyName('avatar')),
                createImageUpload('banner', uploadFilePropertyName('banner')),
            ],
        },
        {
            resource: { model: getModelByName('Post'), client: prisma },
            options: {
                titleProperty: 'title',
                listProperties: [ 'id', 'title', 'status', uploadFilePropertyName('image'), 'createdAt' ],
                editProperties: [ 'title', 'content', uploadFilePropertyName('image'), 'status', 'tags', 'user' ],
                properties: {
                    image: hiddenKeyProperty(),
                    tags: {
                        type: 'string',
                        isVisible: { edit: true, show: true, list: false, filter: false },
                        description: 'Введите теги через запятую (например: поход, горы, лето)'
                    },
                    user: {
                        reference: 'User',
                        isVisible: { edit: true, show: true }
                    }
                },
                actions: {
                    new: {
                        before: async(request: ActionRequest) => {
                            if (request.payload?.tags && typeof request.payload.tags === 'string') {
                                const tagsArray = request.payload.tags.split(',').map(t => t.trim()).filter(Boolean)
                                request.payload.tags = JSON.stringify(tagsArray)
                            }
                            return request
                        }
                    },
                    edit: {
                        before: async(request: ActionRequest) => {
                            if (request.payload?.tags && typeof request.payload.tags === 'string') {
                                const tagsArray = request.payload.tags.split(',').map(t => t.trim()).filter(Boolean)
                                request.payload.tags = JSON.stringify(tagsArray)
                            }
                            return request
                        }
                    }
                }
            },
            features: [
                createImageUpload('image', uploadFilePropertyName('image')),
            ],
        },
        {
            resource: { model: getModelByName('Announcement'), client: prisma },
            options: {
                titleProperty: 'title',
                listProperties: [ 'id', 'title', 'status', 'departure', 'destination', 'createdAt' ],
                editProperties: [
                    'title',
                    'description',
                    'dateFrom',
                    'dateTo',
                    'departure',
                    'destination',
                    'genderInterest',
                    'status',
                    uploadFilePropertyName('icon'),
                    'user',
                    'interests'
                ],
                properties: {
                    icon: hiddenKeyProperty(),
                    user: {
                        reference: 'User',
                        isVisible: { edit: true, show: true }
                    },
                    interests: {
                        reference: 'Interest',
                        isArray: true,
                        isVisible: { edit: true, show: true }
                    },
                    description: { type: 'richtext' }
                }
            },
            features: [
                createImageUpload('icon', uploadFilePropertyName('icon')),
            ],
        },
        {
            resource: { model: getModelByName('Category'), client: prisma },
            options: {
                titleProperty: 'name',
                listProperties: [ 'id', 'name', uploadFilePropertyName('icon'), 'createdAt' ],
                editProperties: [ 'name', uploadFilePropertyName('icon'), 'isCountry' ],
                properties: {
                    icon: hiddenKeyProperty(),
                }
            },
            features: [
                createImageUpload('icon', uploadFilePropertyName('icon')),
            ],
        },
        {
            resource: { model: getModelByName('Interest'), client: prisma },
            options: {
                titleProperty: 'name',
                listProperties: [ 'id', 'name', 'category', uploadFilePropertyName('image'), 'createdAt' ],
                editProperties: [ 'name', uploadFilePropertyName('image'), 'category' ],
                properties: {
                    image: hiddenKeyProperty(),
                    category: {
                        reference: 'Category',
                        isVisible: { edit: true, show: true }
                    }
                }
            },
            features: [
                createImageUpload('image', uploadFilePropertyName('image')),
            ],
        },
        {
            resource: { model: getModelByName('Page'), client: prisma },
            options: {
                titleProperty: 'name',
                listProperties: [ 'id', 'name', 'alias' ],
                editProperties: [ 'name', 'alias', 'content' ],
                properties: {
                    alias: {
                        isRequired: true,
                    },
                    content: { type: 'richtext' }
                }
            }
        },
        {
            resource: { model: getModelByName('EmailMessage'), client: prisma },
            options: {
                titleProperty: 'subject',
                listProperties: [ 'id', 'from', 'subject' ],
                editProperties: [ 'from', 'subject', 'content' ],
                showProperties: [ 'id', 'from', 'subject', 'content' ],
                actions: {
                    new: { isAccessible: false, isVisible: false },
                    delete: { isAccessible: false, isVisible: false },
                    bulkDelete: { isAccessible: false, isVisible: false },
                },
                properties: {
                    content: { type: 'textarea' },
                },
            },
        },
    ],
    rootPath: '/admin',
    locale: {
        language: 'ru',
        availableLanguages: [ 'ru' ],
        localeDetection: true,
        translations: {
            ru: ruLocale
        }
    }
})
