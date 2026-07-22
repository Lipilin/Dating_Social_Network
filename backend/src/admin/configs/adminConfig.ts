import AdminJS, { Login, type ActionRequest } from 'adminjs'
import { Database, Resource, getModelByName } from '@adminjs/prisma'
import { ruLocale } from '@/admin/configs/locales/ruLocales.js'
import bcrypt from 'bcryptjs'
import { prisma } from '@/app.js'
AdminJS.registerAdapter({ Database, Resource })

export const admin = new AdminJS({
    branding: {
        companyName: 'Boltaem Admin',
        logo: '/resources/header_logo.svg'
    },
    resources: [
        {
            resource: { model: getModelByName('User'), client: prisma },
            options: {
                titleProperty: 'email',
                listProperties: [ 'id', 'email', 'name', 'role', 'status', 'createdAt' ],
                editProperties: [ 
                    'email', 
                    'password', 
                    'name', 
                    'surname', 
                    'description', 
                    'status', 
                    'role', 
                    'avatar', 
                    'banner' 
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
                    metadata: { type: 'json' }
                }
            }
        },
        {
            resource: { model: getModelByName('Post'), client: prisma },
            options: {
                titleProperty: 'title',
                listProperties: [ 'id', 'title', 'status', 'createdAt' ],
                editProperties: [ 'title', 'content', 'image', 'status', 'tags', 'user' ],
                properties: {
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
            }
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
                    'user', 
                    'interests' 
                ],
                properties: {
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
            }
        },
        {
            resource: { model: getModelByName('Category'), client: prisma },
            options: {
                titleProperty: 'name',
                listProperties: [ 'id', 'name', 'createdAt' ],
                editProperties: [ 'name' ]
            }
        },
        {
            resource: { model: getModelByName('Interest'), client: prisma },
            options: {
                titleProperty: 'name',
                listProperties: [ 'id', 'name', 'category', 'createdAt' ],
                editProperties: [ 'name', 'category' ],
                properties: {
                    category: {
                        reference: 'Category',
                        isVisible: { edit: true, show: true }
                    }
                }
            }
        }
    ],
    rootPath: '/admin',
    locale: {
        language: 'ru',
        availableLanguages: [ 'ru', 'en' ],
        localeDetection: true,
        translations: {
            ru: ruLocale
        }
    }
})