import type { PrismaClient } from '@prisma/client'
import { STATIC_ROUTES_FOR_BUTTOS } from '@pick-me-up/common/config.js'
import { EMAIL_MESSAGES } from '@pick-me-up/common/emailMessages.js'

const STATIC_PAGES = [
  {
    alias: STATIC_ROUTES_FOR_BUTTOS.ABOUT.replace(/^\//, ''),
    name: 'О Pick Me Up',
    content: `
      <p>Pick Me Up — платформа знакомств для путешественников.</p>
      <p>Мы помогаем находить единомышленников, знакомиться и планировать совместные поездки.</p>
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
      <p>Используя Pick Me Up, вы соглашаетесь соблюдать правила сервиса и уважительно относиться к другим пользователям.</p>
      <p>Запрещено размещение незаконного, оскорбительного или вводящего в заблуждение контента.</p>
    `.trim(),
  },
  {
    alias: STATIC_ROUTES_FOR_BUTTOS.HELP.replace(/^\//, ''),
    name: 'Помощь',
    content: `
      <p>Если у вас возникли вопросы по работе сервиса, напишите нам на <a href="mailto:support@pickmeup.ru">support@pickmeup.ru</a>.</p>
      <p>Мы ответим в течение 1–2 рабочих дней.</p>
    `.trim(),
  },
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
