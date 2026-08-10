export const ruLocale = {
    labels: {
        User: 'Пользователи',
        Post: 'Посты',
        Announcement: 'Объявления',
        Category: 'Категории',
        Interest: 'Интересы',
        Page: 'Страницы',
        EmailMessage: 'Email-сообщения',
        loginWelcome: 'Добро пожаловать',
        email: 'Email',
        login: 'Логин',
        password: 'Пароль',
        loginButton: 'Войти',
        dashboard: 'Панель управления',
        prisma: 'Prisma',
        filters: 'Фильтры',
        navigation: 'Навигация',
        status: {
            PENDING_APPROVEMENT: 'На одобрении',
            PUBLISHED: 'Опубликован',
            BANNED: 'Заблокирован',
            REGISTERED: 'Зарегистрирован',
            NEW: 'На подтверждении почты'
        },
        genderInterest: {
            MALE: 'Мужской',
            FEMALE: 'Женский',
            ANYBODY: 'Любой'
        },
        role: {
            USER: 'Пользователь',
            ADMIN: 'Админ'
        }
    },
    properties: {
        id: 'ID',
        email: 'Email',
        login: 'Логин',
        password: 'Пароль',
        name: 'Имя',
        surname: 'Фамилия',
        description: 'Описание',
        status: 'Статус',
        role: 'Роль',
        avatar: 'Аватар',
        banner: 'Баннер',
        metadata: 'Метаданные',
        title: 'Заголовок',
        content: 'Содержание',
        alias: 'Алиас',
        image: 'Изображение',
        icon: 'Иконка',
        upload_avatar: 'Аватар',
        upload_banner: 'Баннер',
        upload_image: 'Изображение',
        upload_icon: 'Иконка',
        tags: 'Теги',
        user: 'Пользователь',
        dateFrom: 'Дата от',
        dateTo: 'Дата до',
        departure: 'Откуда',
        destination: 'Куда',
        genderInterest: 'Интерес к полу',
        interests: 'Интересы',
        category: 'Категория',
        isCountry: 'Страна',
        createdAt: 'Создано',
        updatedAt: 'Обновлено',
        from: 'От',
        to: 'До',
        subject: 'Тема',
    },
    messages: {
        dashboard: 'Панель управления',
        welcomeOnBoard_title: 'Добро пожаловать в панель управления Boltaem',
        welcomeOnBoard_subtitle: 'Управление системой для пользователей',
        loginWelcome: 'Добро пожаловать в Boltaem Admin',
        loginButton: 'Войти',
        addingResources_title: 'Добавление ресурсов',
        addingResources_subtitle: 'Создавайте и управляйте ресурсами вашей системы',
        customizeResources_title: 'Настройка ресурсов',
        customizeResources_subtitle: 'Изменяйте поведение и отображение ресурсов',
        customizeActions_title: 'Настройка действий',
        customizeActions_subtitle: 'Создавайте и изменяйте действия для ресурсов',
        writeOwnComponents_title: 'Создание компонентов',
        writeOwnComponents_subtitle: 'Пишите собственные компоненты для интерфейса',
        customDashboard_title: 'Пользовательская панель',
        customDashboard_subtitle: 'Настройте главную страницу панели управления',
        roleBasedAccess_title: 'Доступ по ролям',
        roleBasedAccess_subtitle: 'Управляйте доступом на основе ролей пользователей',
        needMoreSolutions_title: 'Нужны дополнительные решения?',
        needMoreSolutions_subtitle: 'Изучите документацию и примеры',
        community_title: 'Сообщество',
        community_subtitle: 'Общайтесь с разработчиками и задавайте вопросы',
        foundBug_title: 'Нашли ошибку?',
        foundBug_subtitle: 'Сообщите о проблеме в репозиторий проекта',
        noRecords: 'Записи не найдены',
        noRecordsInResource: 'В этом ресурсе нет записей'
    },
    buttons: {
        save: 'Сохранить',
        add: 'Добавить',
        edit: 'Редактировать',
        delete: 'Удалить',
        filter: 'Фильтр',
        apply: 'Применить',
        reset: 'Сбросить',
        list: 'Список',
        new: 'Создать',
        show: 'Показать',
        confirm: 'Подтвердить',
        cancel: 'Отмена',
        update: 'Обновить',
        remove: 'Удалить',
        confirmRemovalMany_1: 'Подтвердить удаление {{count}} записи',
        confirmRemovalMany_2: 'Подтвердить удаление {{count}} записей',
        logout: 'Выйти',
        contactUs: 'Связаться с нами',
        createFirstRecord: 'Создать первую запись',
        resetFilter: 'Сбросить фильтр',
        applyChanges: 'Применить изменения'
    },
    actions: {
        new: 'Создать новый',
        edit: 'Редактировать',
        show: 'Показать',
        delete: 'Удалить',
        list: 'Список',
        bulkDelete: 'Удалить выбранные'
    },
    components: {
        LanguageSelector: {
            availableLanguages: {
                ru: 'Русский',
                en: 'Английский'
            }
        },
        Login: {
            welcomeHeader: 'Добро пожаловать в систему',
            welcomeMessage: 'Войдите в свою учётную запись',
            properties: {
                email: 'Электронная почта',
                password: 'Пароль'
            },
            loginButton: 'Войти'
        }
    },
    resources: {
        User: {
            labels: {
                singular: 'Пользователь',
                plural: 'Пользователи'
            },
            properties: {
                login: 'Логин',
            }
        },
        Post: {
            labels: {
                singular: 'Пост',
                plural: 'Посты'
            }
        },
        Announcement: {
            labels: {
                singular: 'Объявление',
                plural: 'Объявления'
            }
        },
        Category: {
            labels: {
                singular: 'Категория',
                plural: 'Категории'
            }
        },
        Interest: {
            labels: {
                singular: 'Интерес',
                plural: 'Интересы'
            }
        },
        Page: {
            labels: {
                singular: 'Страница',
                plural: 'Страницы'
            },
            properties: {
                alias: 'Алиас (например: about, privacy, terms, help)',
            }
        },
        EmailMessage: {
            labels: {
                singular: 'Email-сообщение',
                plural: 'Email-сообщения'
            },
            properties: {
                from: 'Отправитель',
                subject: 'Тема',
                content: 'Содержание',
            }
        }
    }
}