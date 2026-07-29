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