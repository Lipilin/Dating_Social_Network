import { PrismaClient, GenderPreference, UserContentStatus } from '@prisma/client'
import { faker } from '@faker-js/faker/locale/ru'   // ← русская локаль
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

// Категории уже на русском (одна помечена как страна)
const CATEGORIES = [
  { name: 'Спорт', isCountry: false },
  { name: 'Путешествия', isCountry: true }, // только одна
  { name: 'Искусство', isCountry: false },
  { name: 'Технологии', isCountry: false },
  { name: 'Кулинария', isCountry: false },
]

// Интересы на русском
const INTERESTS_BY_CATEGORY: Record<string, string[]> = {
  Спорт: ['Футбол', 'Баскетбол', 'Теннис', 'Плавание'],
  Путешествия: [
    'США', 'Турция', 'Италия', 'Франция', 'Испания',
    'Германия', 'Великобритания', 'Греция', 'Египет', 'Таиланд',
    'ОАЭ', 'Мексика', 'Бразилия', 'Австралия', 'Япония'
  ],
  Искусство: ['Музыка', 'Живопись', 'Театр', 'Фотография'],
  Технологии: ['Программирование', 'Робототехника', 'Искусственный интеллект', 'Кибербезопасность'],
  Кулинария: ['Азиатская кухня', 'Итальянская кухня', 'Выпечка', 'Вегетарианство'],
}

const GENDERS = [GenderPreference.MALE, GenderPreference.FEMALE, GenderPreference.ANYBODY]

async function seed() {
  console.log('🌱 Начинаем заполнение базы данных...')

  // Очистка
  console.log('🧹 Очистка старых данных...')
  await prisma.announcement.deleteMany()
  await prisma.interest.deleteMany()
  await prisma.category.deleteMany()
  await prisma.user.deleteMany()

  // Создание категорий и интересов
  console.log('📂 Создание категорий и интересов...')
  for (const cat of CATEGORIES) {
    const category = await prisma.category.create({
      data: {
        name: cat.name,
        isCountry: cat.isCountry,
      },
    })

    const interestNames = INTERESTS_BY_CATEGORY[cat.name] || []
    for (const interestName of interestNames) {
      await prisma.interest.create({
        data: {
          name: interestName,
          categoryId: category.id,
        },
      })
    }
  }

  const allInterests = await prisma.interest.findMany()
  console.log(`✅ Создано интересов: ${allInterests.length}`)

  // Создание пользователей (все данные на русском)
  console.log('👤 Создание пользователей...')
  const users = []
  const userCount = 10
  for (let i = 0; i < userCount; i++) {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const email = faker.internet.email({ firstName, lastName }).toLowerCase()
    const password = await bcrypt.hash('password123', 10)

    const user = await prisma.user.create({
      data: {
        email,
        password,
        age: faker.number.int({ min: 18, max: 99 }),
        name: firstName,
        surname: lastName,
        description: faker.lorem.sentence({ min: 5, max: 15 }),
        status: faker.helpers.arrayElement(['NEW', 'REGISTERED', 'PENDING_APPROVEMENT', 'BANNED']),
        role: faker.helpers.arrayElement(['USER', 'ADMIN']),
        avatar: faker.image.avatarGitHub(),
        banner: faker.image.urlPicsumPhotos(),
        lastSeen: faker.date.recent(),
        metadata: {
          preferences: {
            theme: faker.helpers.arrayElement(['light', 'dark']),
            notifications: faker.datatype.boolean(),
          },
        },
      },
    })
    users.push(user)
  }
  console.log(`✅ Создано пользователей: ${users.length}`)

  // Создание объявлений (всё на русском)
  console.log('📢 Создание объявлений...')
  const announcementCount = 50
  const createdAnnouncements = []

  for (let i = 0; i < announcementCount; i++) {
    const user = faker.helpers.arrayElement(users)
    const selectedInterests = faker.helpers.arrayElements(allInterests, faker.number.int({ min: 1, max: 3 }))

    const dateFrom = faker.date.between({ from: '2023-01-01', to: '2025-12-31' })
    const dateTo = faker.date.between({ from: dateFrom, to: '2026-01-01' })

    const status = faker.helpers.arrayElement([
      UserContentStatus.PUBLISHED,
      UserContentStatus.PUBLISHED,
      UserContentStatus.PUBLISHED,
      UserContentStatus.PENDING_APPROVEMENT,
      UserContentStatus.BANNED,
    ])

    const announcement = await prisma.announcement.create({
      data: {
        title: faker.lorem.sentence({ min: 3, max: 8 }),
        description: faker.lorem.paragraphs({ min: 2, max: 5 }),
        dateFrom,
        dateTo,
        departure: faker.location.city(),
        destination: faker.location.city(),
        genderInterest: faker.helpers.arrayElement(GENDERS),
        status,
        userId: user.id,
        interests: {
          connect: selectedInterests.map((interest) => ({ id: interest.id })),
        },
      },
    })
    createdAnnouncements.push(announcement)
  }

  console.log(`✅ Создано объявлений: ${createdAnnouncements.length}`)
  console.log('🎉 Сиды успешно применены поздравляем!')
}

seed()
  .catch((e) => {
    console.error('❌ Ошибка при заполнении базы:', e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })