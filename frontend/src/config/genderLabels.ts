import { GENDER, GENDER_PREFERENCE } from '@/utils/api/types'

export const userGenderLabels: Record<GENDER, string> = {
    [GENDER.MALE]: 'Мужской',
    [GENDER.FEMALE]: 'Женский',
}

export const genderLabels = {
    [GENDER_PREFERENCE.MALE]: {
        id: 3,
        value: GENDER_PREFERENCE.MALE,
        label: 'Ищу Парня',
    },
    [GENDER_PREFERENCE.FEMALE]: {
        id: 2,
        value: GENDER_PREFERENCE.FEMALE,
        label: 'Ищу Девушку',
    },
    [GENDER_PREFERENCE.ANYBODY]: {
        id: 1,
        value: GENDER_PREFERENCE.ANYBODY,
        label: 'Ищу кого-нибудь',
    },
} as const
