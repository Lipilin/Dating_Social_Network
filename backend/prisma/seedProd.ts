import type { PrismaClient } from '@prisma/client'
import { STATIC_ROUTES_FOR_BUTTOS } from '@boltaem/common/config.js'

const STATIC_PAGES = [
  {
    alias: STATIC_ROUTES_FOR_BUTTOS.ABOUT.replace(/^\//, ''),
    name: 'О Boltaem',
    content: `
      <p>Boltaem — сервис для поиска попутчиков и публикации маршрутов.</p>
      <p>Мы помогаем находить единомышленников для путешествий, активного отдыха и совместных поездок.</p>
    `.trim(),
  },
  {
    alias: STATIC_ROUTES_FOR_BUTTOS.PRIVACY.replace(/^\//, ''),
    name: 'Политика конфиденциальности',
    content: `
      <p>Мы обрабатываем персональные данные пользователей в соответствии с действующим законодательством.</p>
      <p>Данные используются для работы сервиса, авторизации и улучшения пользовательского опыта.</p>
    `.trim(),
  },
  {
    alias: STATIC_ROUTES_FOR_BUTTOS.TERMS.replace(/^\//, ''),
    name: 'Пользовательское соглашение',
    content: `
      <p>Используя Boltaem, вы соглашаетесь соблюдать правила сервиса и уважительно относиться к другим пользователям.</p>
      <p>Запрещено размещение незаконного, оскорбительного или вводящего в заблуждение контента.</p>
    `.trim(),
  },
  {
    alias: STATIC_ROUTES_FOR_BUTTOS.HELP.replace(/^\//, ''),
    name: 'Помощь',
    content: `
      <p>Если у вас возникли вопросы по работе сервиса, напишите нам на <a href="mailto:support@boltaem.ru">support@boltaem.ru</a>.</p>
      <p>Мы ответим в течение 1–2 рабочих дней.</p>
    `.trim(),
  },
] as const

const DEFAULT_EMAIL_MESSAGE = {
  id: 1,
  from: 'support@boltaem.ru',
  subject: 'Boltaem — сообщение от пользователя',
  content: `
    <p>Здравствуйте!</p>
    <p>Вы получили новое сообщение через форму обратной связи Boltaem.</p>
    <p>С уважением,<br/>Команда Boltaem</p>
  `.trim(),
} as const

const PASSWORD_RESET_EMAIL_MESSAGE = {
  id: 2,
  from: 'support@boltaem.ru',
  subject: 'Boltaem — сброс пароля',
  content: `
    <p>Здравствуйте!</p>
    <p>Вы запросили сброс пароля для вашей учётной записи Boltaem.</p>
    <p>Чтобы задать новый пароль, перейдите по ссылке:</p>
    <p><a href="{{resetLink}}">Сбросить пароль</a></p>
    <p>Если вы не запрашивали сброс пароля, просто проигнорируйте это письмо.</p>
    <p>Ссылка действительна в течение 24 часов.</p>
    <p>С уважением,<br/>Команда Boltaem</p>
  `.trim(),
} as const

const EMAIL_MESSAGES = [
  DEFAULT_EMAIL_MESSAGE,
  PASSWORD_RESET_EMAIL_MESSAGE,
] as const

export async function seedProd(prisma: PrismaClient): Promise<void> {
  console.log('📄 Создание статичных страниц...')

  for (const page of STATIC_PAGES) {
    const existing = await prisma.page.findFirst({
      where: { alias: page.alias },
    })

    if (existing) {
      await prisma.page.update({
        where: { id: existing.id },
        data: {
          name: page.name,
          content: page.content,
        },
      })
    } else {
      await prisma.page.create({
        data: {
          name: page.name,
          alias: page.alias,
          content: page.content,
        },
      })
    }
  }

  console.log(`✅ Статичных страниц: ${STATIC_PAGES.length}`)

  console.log('✉️ Создание шаблонов писем...')

  for (const message of EMAIL_MESSAGES) {
    await prisma.emailMessage.upsert({
      where: { id: message.id },
      update: {
        from: message.from,
        subject: message.subject,
        content: message.content,
      },
      create: message,
    })
  }

  console.log(`✅ Шаблонов писем: ${EMAIL_MESSAGES.length}`)
}
