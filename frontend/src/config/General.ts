import { GENDER_PREFERENCE } from '@/utils/api/types'
export const genderLabels = {
    [GENDER_PREFERENCE.MALE]: {
        id: 3,
        value: GENDER_PREFERENCE.MALE, 
        label: 'Парня'
    }, 
    [GENDER_PREFERENCE.FEMALE]: {
        id: 2,
        value: GENDER_PREFERENCE.FEMALE, 
        label: 'Девушку'
    },
    [GENDER_PREFERENCE.ANYBODY]: {
        id: 1,
        value: GENDER_PREFERENCE.ANYBODY, 
        label: 'Кого-нибудь'
    }
}

interface ApiSettings{
    API_HOST: string, 
    DEFAULT_PAGINATION: number, 
    ENDPOINTS: Record<string, Endpoint>
}

interface Endpoint{
    LIST: string
    CREATE: string
    UPDATE: string  
}

export const API_SETTINGS: ApiSettings = {
    API_HOST: 'http://localhost:3000/api', 
    DEFAULT_PAGINATION: 7, 
    ENDPOINTS: {
        ANNOUNCEMENT: {
            LIST: '/announcement/list', 
            CREATE: '', 
            UPDATE: ''
        }, 
        CATEGORIES: {
            LIST: '/category/list', 
            CREATE: '', 
            UPDATE: ''
        }, 
        USER: {
            LIST: '/user/list', 
            CREATE: '', 
            UPDATE: ''
        }
    },
}