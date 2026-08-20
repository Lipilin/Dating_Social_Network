export const EMAIL_NOTIFICATION_ERROR_MESSAGE = {
    SEND: 'Ошибка при отправке письма',
    TEMPLATE_NOT_FOUND: 'Шаблон письма не найден',
    VALIDATION: 'Некорректные данные для отправки письма',
} as const

export const EMAIL_NOTIFICATION_SUCCESS_MESSAGE = {
    REGISTRATION: 'Регистрационное письмо отправлено',
    PASSWORD_RESET: 'Письмо для восстановления пароля отправлено',
} as const
