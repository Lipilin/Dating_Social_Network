export const STATIC_ROUTES_FOR_BUTTOS = {
    ABOUT: '/about',
    PRIVACY: '/privacy',
    TERMS: '/terms',
    HELP: '/help',
} as const

export const HTTP_STATUS = {
    UNAUTHORIZED: 401,
} as const

export const VALIDATION_ERRORS = {
    EMAIL_INVALID: 'Неверный email!',
    PASSWORD_MIN_LENGTH: 'Пароль должен быть не менее 8 символов!',
    PASSWORD_MISMATCH: 'Пароли не совпадают!',
    LOGIN_MIN_LENGTH: 'Логин должен быть не менее 3 символов!',
    ACCEPT_SECURITY: 'Вы должны согласиться с политикой обработки персональных данных!',
    ACCEPT_SERVICE: 'Вы должны согласиться с правилами сервиса!',
    NAME_MIN_LENGTH: 'Имя должно быть не менее 3 символов!',
    NAME_REQUIRED: 'Имя является обязательным',
    SURNAME_MIN_LENGTH: 'Фамилия должна быть не менее 3 символов!',
    SURNAME_REQUIRED: 'Фамилия является обязательным',
    AGE_MIN_18: 'Возраст должен быть не менее 18 лет!',
    AGE_REQUIRED: 'Возраст является обязательным',
    CITY_MIN_LENGTH: 'Город должен быть не менее 3 символов!',
    CITY_REQUIRED: 'Город является обязательным',
    DESCRIPTION_MAX_LENGTH: 'Описание должно быть не более 255 символов!',
    DESCRIPTION_REQUIRED: 'Описание является обязательным',
} as const