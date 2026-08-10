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

  console.log('✉️ Создание шаблона письма...')

  await prisma.emailMessage.upsert({
    where: { id: DEFAULT_EMAIL_MESSAGE.id },
    update: {
      from: DEFAULT_EMAIL_MESSAGE.from,
      subject: DEFAULT_EMAIL_MESSAGE.subject,
      content: DEFAULT_EMAIL_MESSAGE.content,
    },
    create: DEFAULT_EMAIL_MESSAGE,
  })

  console.log('✅ Шаблон письма создан')
}
