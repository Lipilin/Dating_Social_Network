import { PrismaClient, GenderPreference, UserContentStatus } from '@prisma/client'
import { faker } from '@faker-js/faker/locale/ru'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

// ======= КАТЕГОРИИ =======
const CATEGORIES = [
  { name: 'Спорт', isCountry: false },
  { name: 'Путешествия', isCountry: true },  // только эта помечена как страна
  { name: 'Искусство', isCountry: false },
  { name: 'Технологии', isCountry: false },
  { name: 'Кулинария', isCountry: false },
  { name: 'Музыка', isCountry: false },
  { name: 'Кино', isCountry: false },
  { name: 'Фитнес', isCountry: false },
  { name: 'Мода', isCountry: false },
  { name: 'Авто', isCountry: false },
  { name: 'Наука', isCountry: false },
  { name: 'Образование', isCountry: false },
]

// ======= ИНТЕРЕСЫ =======
const INTERESTS_BY_CATEGORY: Record<string, string[]> = {
  Спорт: ['Футбол', 'Баскетбол', 'Теннис', 'Плавание', 'Волейбол', 'Лёгкая атлетика'],
  Путешествия: [
    'США', 'Турция', 'Италия', 'Франция', 'Испания',
    'Германия', 'Великобритания', 'Греция', 'Египет', 'Таиланд',
    'ОАЭ', 'Мексика', 'Бразилия', 'Австралия', 'Япония',
    'Китай', 'Индия', 'Аргентина', 'Канада', 'ЮАР'
  ],
  Искусство: ['Музыка', 'Живопись', 'Театр', 'Фотография', 'Скульптура', 'Архитектура'],
  Технологии: ['Программирование', 'Робототехника', 'Искусственный интеллект', 'Кибербезопасность', 'Веб-разработка', 'Мобильные приложения'],
  Кулинария: ['Азиатская кухня', 'Итальянская кухня', 'Выпечка', 'Вегетарианство', 'Гриль', 'Французская кухня'],
  Музыка: ['Рок', 'Поп', 'Классика', 'Электронная музыка', 'Джаз', 'Хип-хоп'],
  Кино: ['Драма', 'Комедия', 'Фантастика', 'Ужасы', 'Документальное кино', 'Аниме'],
  Фитнес: ['Йога', 'Бег', 'Тренажёрный зал', 'Пилатес', 'Кроссфит', 'Велоспорт'],
  Мода: ['Одежда', 'Обувь', 'Аксессуары', 'Визаж', 'История моды', 'Уличный стиль'],
  Авто: ['Классические авто', 'Спорткары', 'Внедорожники', 'Электромобили', 'Тюнинг', 'Мотоциклы'],
  Наука: ['Астрономия', 'Биология', 'Химия', 'Физика', 'Математика', 'Археология'],
  Образование: ['Иностранные языки', 'Программирование', 'Психология', 'История', 'Экономика', 'Медицина'],
}

// ======= РОССИЙСКИЕ ГОРОДА (30 штук) =======
const RUSSIAN_CITIES = [
  'Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань',
  'Нижний Новгород', 'Челябинск', 'Самара', 'Омск', 'Ростов-на-Дону',
]

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

  // Создание пользователей
  console.log('👤 Создание пользователей...')
  const users = []
  const userCount = 100
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

  // Создание объявлений
  console.log('📢 Создание объявлений...')
  const announcementCount = 1000
  const createdAnnouncements = []

  for (let i = 0; i < announcementCount; i++) {
    const user = faker.helpers.arrayElement(users)
    // Теперь выбираем от 2 до 3 интересов (раньше было от 1 до 3)
    const selectedInterests = faker.helpers.arrayElements(
      allInterests,
      faker.number.int({ min: 2, max: 3 })
    )

    const dateFrom = faker.date.between({ from: '2023-01-01', to: '2025-12-31' })
    const dateTo = faker.date.between({ from: dateFrom, to: '2026-01-01' })

    const city1 = faker.helpers.arrayElement(RUSSIAN_CITIES)
    let city2 = faker.helpers.arrayElement(RUSSIAN_CITIES)
    while (city2 === city1) {
      city2 = faker.helpers.arrayElement(RUSSIAN_CITIES)
    }

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
        departure: city1,
        destination: city2,
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
  console.log('🎉 Сиды успешно применены!')
}

seed()
  .catch((e) => {
    console.error('❌ Ошибка при заполнении базы:', e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })