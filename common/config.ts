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
    POST_TITLE_MIN_LENGTH: 'Заголовок должен быть не менее 3 символов!',
    POST_CONTENT_MIN_LENGTH: 'Содержание должно быть не менее 10 символов!',
    ANNOUNCEMENT_TITLE_MIN_LENGTH: 'Заголовок должен быть не менее 3 символов!',
    ANNOUNCEMENT_DEPARTURE_MIN_LENGTH: 'Пункт отправления должен быть не менее 2 символов!',
    ANNOUNCEMENT_DESTINATION_MIN_LENGTH: 'Пункт назначения должен быть не менее 2 символов!',
    ANNOUNCEMENT_DATE_FROM_REQUIRED: 'Дата начала является обязательной!',
    ANNOUNCEMENT_DATE_FROM_NOT_PAST: 'Дата начала не может быть в прошлом!',
    ANNOUNCEMENT_DATE_TO_REQUIRED: 'Дата окончания является обязательной!',
    ANNOUNCEMENT_DATE_TO_NOT_PAST: 'Дата окончания не может быть в прошлом!',
    ANNOUNCEMENT_DATE_TO_BEFORE_FROM: 'Дата окончания не может быть раньше даты начала!',
    ANNOUNCEMENT_GENDER_REQUIRED: 'Предпочтение по полу является обязательным!',
    ANNOUNCEMENT_DESCRIPTION_MIN_LENGTH: 'Описание должно быть не менее 10 символов!',
    ANNOUNCEMENT_INTERESTS_REQUIRED: 'Необходимо выбрать хотя бы один интерес!',
} as const

export const SERVER_ERRORS = {
    USER_ALREADY_EXISTS: 'Пользователь с таким email или логином уже существует',
    REGISTRATION_ERROR: 'Ошибка при регистрации',
    LOGIN_FAILED: 'Неправильный логин или пароль',
} as const