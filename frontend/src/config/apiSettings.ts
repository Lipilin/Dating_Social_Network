interface ApiSettings{
    API_HOST: string,
    DEFAULT_PAGINATION: number,
    ENDPOINTS: Record<string, Endpoint>
}

interface BaseEndpoint{
    LIST: string
    CREATE: string
    UPDATE: string
    GET: string
    DELETE: string
}

type Endpoint = BaseEndpoint & Record<string, string>

export const CATEGORY_DEFAULT_PAGINATION = 5

export const API_SETTINGS: ApiSettings = {
    API_HOST: '/api',
    DEFAULT_PAGINATION: 7,
    ENDPOINTS: {
        ANNOUNCEMENT: {
            LIST: '/announcement/list',
            CREATE: '/announcement/create',
            UPDATE: '/announcement/update',
            GET: '/announcement/get',
            DELETE: '/announcement/delete',
        },
        CATEGORIES: {
            LIST: '/category/list',
            CREATE: '',
            UPDATE: '',
            GET: '/category/get',
            DELETE: '',
        },
        USER: {
            LIST: '/user/list',
            CREATE: '/user/create',
            UPDATE: '/user/update',
            GET: '/user/get',
            LOGIN: '/user/login',
            ME: '/user/me',
            CREATE_ANNOUNCEMENT: '/user/create-announcement',
            CREATE_POST: '/user/create-post',
            REFRESH: '/user/refresh',
            LOGOUT: '/user/logout',
            DELETE: ''
        },
        POST: {
            LIST: '/post/list',
            CREATE: '/post/create',
            UPDATE: '/post/update',
            GET: '/post/get',
            DELETE: '/post/delete',
        },
        PAGE: {
            LIST: '/page/list',
            CREATE: '',
            UPDATE: '',
            GET: '/page/get',
            DELETE: '',
        },
        EMAIL_NOTIFICATION: {
            LIST: '',
            CREATE: '',
            UPDATE: '',
            GET: '',
            DELETE: '',
            PASSWORD_RESET: '/email-notification/password-reset',
        },
    },
} as const
