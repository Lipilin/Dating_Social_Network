export const POST_ERROR_MESSAGE = {
    CREATE: 'Ошибка при создании публикации',
    UPDATE: 'Ошибка при обновлении публикации',
    NOT_FOUND: 'Публикация не найдена',
    FORBIDDEN: 'Нет доступа к редактированию публикации',
    USER_NOT_FOUND: 'Пользователь не найден',
    VALIDATION: 'Некорректные данные для создания публикации',
    MISSING_POST_ID: 'ID публикации не передан',
} as const

export const POST_SUCCESS_MESSAGE = {
    CREATE: 'Публикация успешно создана',
    UPDATE: 'Публикация успешно обновлена',
} as const
