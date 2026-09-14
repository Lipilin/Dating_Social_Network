import AdminJS, { type ActionRequest, type RecordActionResponse, type RecordJSON } from 'adminjs'
import { Database, Resource, getModelByName } from '@adminjs/prisma'
import { ruLocale } from '@/admin/configs/locales/ruLocales.js'
import { componentLoader } from '@/admin/configs/componentLoader.js'
import {
    createImageUpload,
    hiddenKeyProperty,
    imagePreviewPropertyOverrides,
    uploadFilePropertyName,
} from '@/admin/configs/uploadConfig.js'
import bcrypt from 'bcryptjs'
import { prisma } from '@/prisma.js'

AdminJS.registerAdapter({ Database, Resource })

const passwordFieldProps = {
    autoComplete: 'new-password',
}

async function hashPasswordInPayload(request: ActionRequest, passwordField: string) {
    const password = request.payload?.[passwordField]
    if (typeof password === 'string' && password.length > 0) {
        request.payload![passwordField] = await bcrypt.hash(password, 10)
    } else {
        delete request.payload?.[passwordField]
    }
}

function formatTagsForForm(record: RecordJSON) {
    const tags = record.params.tags
    if (!tags) {
        return record
    }

    if (Array.isArray(tags)) {
        record.params.tags = tags.join(', ')
        return record
    }

    if (typeof tags === 'string') {
        try {
            const parsed: unknown = JSON.parse(tags)
            if (Array.isArray(parsed)) {
                record.params.tags = parsed.join(', ')
            }
        } catch {
            // keep original string
        }
    }

    return record
}

function parseTagsInPayload(request: ActionRequest) {
    if (request.payload?.tags && typeof request.payload.tags === 'string') {
        const tagsArray = request.payload.tags.split(',').map(t => t.trim()).filter(Boolean)
        request.payload.tags = JSON.stringify(tagsArray)
    }
    return request
}

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
                newProperties: [
                    'email',
                    'login',
                    'password',
                    'name',
                    'surname',
                    'age',
                    'city',
                    'description',
                    'status',
                    'role',
                    uploadFilePropertyName('avatar'),
                    uploadFilePropertyName('banner'),
                ],
                editProperties: [
                    'email',
                    'login',
                    'newPassword',
                    'name',
                    'surname',
                    'age',
                    'city',
                    'description',
                    'status',
                    'role',
                    uploadFilePropertyName('avatar'),
                    uploadFilePropertyName('banner'),
                ],
                actions: {
                    new: {
                        before: async(request: ActionRequest) => {
                            await hashPasswordInPayload(request, 'password')
                            return request
                        }
                    },
                    edit: {
                        before: async(request: ActionRequest) => {
                            if (request.payload?.newPassword) {
                                request.payload.password = request.payload.newPassword
                                await hashPasswordInPayload(request, 'password')
                            } else {
                                delete request.payload?.password
                            }
                            delete request.payload?.newPassword
                            return request
                        }
                    }
                },
                properties: {
                    password: {
                        type: 'password',
                        isRequired: true,
                        props: passwordFieldProps,
                        isVisible: {
                            new: true,
                            edit: false,
                            show: false,
                            list: false,
                            filter: false
                        }
                    },
                    newPassword: {
                        type: 'password',
                        props: passwordFieldProps,
                        isVisible: {
                            new: false,
                            edit: true,
                            show: false,
                            list: false,
                            filter: false
                        }
                    },
                    age: { isRequired: true },
                    city: { isRequired: true },
                    avatar: hiddenKeyProperty(),
                    banner: hiddenKeyProperty(),
                    metadata: { type: 'json' },
                    ...imagePreviewPropertyOverrides([ 'avatar', 'banner' ]),
                }
            },
            features: [
                createImageUpload('users', 'avatar', uploadFilePropertyName('avatar'), 'avatarFile'),
                createImageUpload('users', 'banner', uploadFilePropertyName('banner'), 'bannerFile'),
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
                    },
                    ...imagePreviewPropertyOverrides([ 'image' ]),
                },
                actions: {
                    new: {
                        before: parseTagsInPayload
                    },
                    edit: {
                        before: parseTagsInPayload,
                        after: async(response: RecordActionResponse) => {
                            if (response.record) {
                                response.record = formatTagsForForm(response.record)
                            }
                            return response
                        }
                    },
                    show: {
                        after: async(response: RecordActionResponse) => {
                            if (response.record) {
                                response.record = formatTagsForForm(response.record)
                            }
                            return response
                        }
                    }
                }
            },
            features: [
                createImageUpload('posts', 'image', uploadFilePropertyName('image'), 'file'),
            ],
        },
        {
            resource: { model: getModelByName('Announcement'), client: prisma },
            options: {
                titleProperty: 'title',
                listProperties: [ 'id', 'title', 'status', 'departure', 'destination', uploadFilePropertyName('icon'), 'createdAt' ],
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
                    description: { type: 'richtext' },
                    ...imagePreviewPropertyOverrides([ 'icon' ]),
                }
            },
            features: [
                createImageUpload('announcements', 'icon', uploadFilePropertyName('icon'), 'file'),
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
                    ...imagePreviewPropertyOverrides([ 'icon' ]),
                }
            },
            features: [
                createImageUpload('categories', 'icon', uploadFilePropertyName('icon'), 'icon'),
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
                    },
                    ...imagePreviewPropertyOverrides([ 'image' ]),
                }
            },
            features: [
                createImageUpload('interests', 'image', uploadFilePropertyName('image'), 'image'),
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
