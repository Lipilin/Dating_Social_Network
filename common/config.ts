export const STATIC_ROUTES_FOR_BUTTOS = {
    ABOUT: '/about',
    PRIVACY: '/privacy',
    TERMS: '/terms',
    HELP: '/help',
} as const

export const EMAIL_NOTIFICATIONS_URLS = {
    CONFIRM_REGISTRATION: '/email/confirm',
    PASSWORD_RESET: '/password-reset',
} as const

export const SITE_SUPPORT_EMAIL = 'support@pickmeup.ru'

export const EMAIL_CONFIRMATION_ERROR_MESSAGE = {
    INVALID_TOKEN: 'Недействительный токен подтверждения',
    EXPIRED_TOKEN: 'Срок действия токена подтверждения истёк',
    USER_NOT_FOUND: 'Пользователь для подтверждения не найден',
    USER_MISMATCH: 'Данные пользователя не совпадают с токеном',
    ALREADY_CONFIRMED: 'Email уже подтверждён',
} as const

export const EMAIL_CONFIRMATION_SUCCESS_MESSAGE = {
    CONFIRMED: 'Email успешно подтверждён',
} as const

export const PASSWORD_RESET_ERROR_MESSAGE = {
    INVALID_TOKEN: 'Недействительный токен восстановления пароля',
    EXPIRED_TOKEN: 'Срок действия токена восстановления пароля истёк',
    USER_NOT_FOUND: 'Пользователь с таким email не найден',
} as const

export const PASSWORD_RESET_SUCCESS_MESSAGE = {
    PASSWORD_CHANGED: 'Пароль успешно изменён',
} as const

export const EMAIL_NOTIFICATION_FALLBACK_ERROR_MESSAGE =
    'Не удалось выполнить операцию. Попробуйте позже или обратитесь в поддержку.'

export const HTTP_STATUS = {
    UNAUTHORIZED: 401,
} as const

export const VALIDATION_ERRORS = {
    EMAIL_INVALID: 'Неверный email!',
    TOKEN_REQUIRED: 'Токен обязателен!',
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