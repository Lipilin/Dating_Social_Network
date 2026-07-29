import { PrismaClient, GenderPreference, UserContentStatus } from '@prisma/client'
import { faker } from '@faker-js/faker'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const CATEGORIES = [
  { name: 'Спорт' },
  { name: 'Путешествия' },
  { name: 'Искусство' },
  { name: 'Технологии' },
  { name: 'Кулинария' },
]

const INTERESTS_BY_CATEGORY: Record<string, string[]> = {
  Спорт: ['Футбол', 'Баскетбол', 'Теннис', 'Плавание'],
  Путешествия: ['Автостоп', 'Походы', 'Велотуризм', 'Пляжный отдых'],
  Искусство: ['Музыка', 'Живопись', 'Театр', 'Фотография'],
  Технологии: ['Программирование', 'Робототехника', 'Искусственный интеллект', 'Кибербезопасность'],
  Кулинария: ['Азиатская кухня', 'Итальянская кухня', 'Выпечка', 'Вегетарианство'],
}

const GENDERS = [GenderPreference.MALE, GenderPreference.FEMALE, GenderPreference.ANYBODY]

async function seed() {
  console.log('🌱 Начало заполнения базы...')

  // 1. Очистка таблиц (в порядке зависимостей)
  console.log('🧹 Очистка старых данных...')
  await prisma.announcement.deleteMany()
  await prisma.interest.deleteMany()
  await prisma.category.deleteMany()
  await prisma.user.deleteMany()

  // 2. Создание категорий и интересов
  console.log('📂 Создание категорий и интересов...')
  const createdCategories: Record<string, any> = {}

  for (const cat of CATEGORIES) {
    const category = await prisma.category.create({
      data: {
        name: cat.name,
      },
    })
    createdCategories[cat.name] = category

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

  // 3. Получение всех интересов для дальнейшего использования
  const allInterests = await prisma.interest.findMany()
  console.log(`✅ Создано ${allInterests.length} интересов`)

  // 4. Создание пользователей
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
        name: `${firstName} ${lastName}`,
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
  console.log(`✅ Создано ${users.length} пользователей`)

  // 5. Создание объявлений
  console.log('📢 Создание объявлений...')
  const announcementCount = 50
  const createdAnnouncements = []

  for (let i = 0; i < announcementCount; i++) {
    // Случайный пользователь
    const user = faker.helpers.arrayElement(users)

    // Случайные интересы (от 1 до 3)
    const selectedInterests = faker.helpers.arrayElements(allInterests, faker.number.int({ min: 1, max: 3 }))

    // Случайные даты (dateFrom и dateTo могут быть в прошлом, настоящем или будущем)
    const dateFrom = faker.date.between({ from: '2023-01-01', to: '2025-12-31' })
    const dateTo = faker.date.between({ from: dateFrom, to: '2026-01-01' })

    const genderInterest = faker.helpers.arrayElement(GENDERS)

    // Случайный статус: чаще PUBLISHED
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
        genderInterest,
        status,
        userId: user.id,
        interests: {
          connect: selectedInterests.map((interest) => ({ id: interest.id })),
        },
      },
    })
    createdAnnouncements.push(announcement)
  }

  console.log(`✅ Создано ${createdAnnouncements.length} объявлений`)

  console.log('🎉 Сиды успешно применены!')
}

seed()
  .catch((e) => {
    console.error('❌ Ошибка при заполнении базы:', e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })