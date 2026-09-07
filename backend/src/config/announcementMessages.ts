export const ANNOUNCEMENT_ERROR_MESSAGE = {
    CREATE: 'Ошибка при создании объявления',
    UPDATE: 'Ошибка при обновлении объявления',
    NOT_FOUND: 'Объявление не найдено',
    FORBIDDEN: 'Нет доступа к редактированию объявления',
    USER_NOT_FOUND: 'Пользователь не найден',
    VALIDATION: 'Некорректные данные для создания объявления',
    MISSING_ANNOUNCEMENT_ID: 'ID объявления не передан',
} as const

export const ANNOUNCEMENT_SUCCESS_MESSAGE = {
    CREATE: 'Объявление успешно создано',
    UPDATE: 'Объявление успешно обновлено',
} as const
