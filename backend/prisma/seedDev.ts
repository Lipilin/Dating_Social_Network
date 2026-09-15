import {
  Gender,
  GenderPreference,
  UserContentStatus,
  UserStatus,
  UserRole,
  type Interest,
  type PrismaClient,
} from '@prisma/client'
import { faker } from '@faker-js/faker/locale/ru'
import bcrypt from 'bcryptjs'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function resolveResourcesDir(): string {
  const candidates = [
    path.join(__dirname, '..', 'resources'),
    path.join(process.cwd(), 'resources'),
  ]

  for (const dir of candidates) {
    if (fs.existsSync(dir)) {
      return dir
    }
  }

  throw new Error(
    `Папка resources не найдена. Проверены пути:\n${candidates.map((dir) => `- ${dir}`).join('\n')}`,
  )
}

const RESOURCES_DIR = resolveResourcesDir()
const DEV_BASE_URL = ''

function toPublicUrl(relativePath: string): string {
  return `${DEV_BASE_URL}${relativePath}`
}

const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'])

function listResourceFiles(subdir: string): string[] {
  const dir = path.join(RESOURCES_DIR, subdir)
  if (!fs.existsSync(dir)) {
    throw new Error(`Папка resources/${subdir} не найдена: ${dir}`)
  }

  const files = fs
    .readdirSync(dir)
    .filter((file: string) => {
      if (file.startsWith('.')) return false
      const fullPath = path.join(dir, file)
      if (!fs.statSync(fullPath).isFile()) return false
      return IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase())
    })
    .sort((a, b) => a.localeCompare(b, 'en'))

  if (files.length === 0) {
    throw new Error(`В resources/${subdir} нет файлов: ${dir}`)
  }

  return files.map((file: string) => toPublicUrl(`/resources/${subdir}/${file}`))
}

const CATEGORY_ICONS = listResourceFiles('categories')
const DESTINATION_IMAGES = listResourceFiles('destinations')
const AVATAR_IMAGES = listResourceFiles('seed_photos/users/avatars')
const BANNER_IMAGES = listResourceFiles('seed_photos/users/banners')
const POST_IMAGES = listResourceFiles('seed_photos/posts')
const ANNOUNCEMENT_IMAGES = listResourceFiles('seed_photos/announcements')
const INTEREST_IMAGES = listResourceFiles('seed_photos/interests')

function pickByIndex<T>(items: T[], index: number): T {
  return items[index % items.length]
}

function categoryIcon(index: number): string {
  return pickByIndex(CATEGORY_ICONS, index)
}

function destinationImage(index: number): string {
  return pickByIndex(DESTINATION_IMAGES, index)
}

function avatarImage(index: number): string {
  return pickByIndex(AVATAR_IMAGES, index)
}

function bannerImage(index: number): string {
  return pickByIndex(BANNER_IMAGES, index)
}

function postImage(index: number): string {
  return pickByIndex(POST_IMAGES, index)
}

function announcementIcon(index: number): string {
  return pickByIndex(ANNOUNCEMENT_IMAGES, index)
}

function interestImage(index: number): string {
  return pickByIndex(INTEREST_IMAGES, index)
}

function pickUserInterests(allInterests: Interest[]): Interest[] {
  return faker.helpers.arrayElements(
    allInterests,
    faker.number.int({ min: 3, max: 8 }),
  )
}

function buildLogin(firstName: string, lastName: string, suffix = ''): string {
  const base = faker.internet.username({ firstName, lastName }).toLowerCase()
  return `${base}${suffix}`.slice(0, 50)
}

const CATEGORIES = [
  { name: 'Спорт', isCountry: false },
  { name: 'Путешествия', isCountry: true },
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

const INTERESTS_BY_CATEGORY: Record<string, string[]> = {
  Спорт: ['Футбол', 'Баскетбол', 'Теннис', 'Плавание', 'Волейбол', 'Лёгкая атлетика'],
  Путешествия: [
    'США',
    'Турция',
    'Италия',
    'Франция',
    'Испания',
    'Германия',
    'Великобритания',
    'Греция',
    'Египет',
    'Таиланд',
    'ОАЭ',
    'Мексика',
    'Бразилия',
    'Австралия',
    'Япония',
    'Китай',
    'Индия',
    'Аргентина',
    'Канада',
    'ЮАР',
  ],
  Искусство: ['Живопись', 'Театр', 'Фотография', 'Скульптура', 'Архитектура', 'Дизайн'],
  Технологии: [
    'Программирование',
    'Робототехника',
    'Искусственный интеллект',
    'Кибербезопасность',
    'Веб-разработка',
    'Мобильные приложения',
  ],
  Кулинария: [
    'Азиатская кухня',
    'Итальянская кухня',
    'Выпечка',
    'Вегетарианство',
    'Гриль',
    'Французская кухня',
  ],
  Музыка: ['Рок', 'Поп', 'Классика', 'Электронная музыка', 'Джаз', 'Хип-хоп'],
  Кино: ['Драма', 'Комедия', 'Фантастика', 'Ужасы', 'Документальное кино', 'Аниме'],
  Фитнес: ['Йога', 'Бег', 'Тренажёрный зал', 'Пилатес', 'Кроссфит', 'Велоспорт'],
  Мода: ['Одежда', 'Обувь', 'Аксессуары', 'Визаж', 'История моды', 'Уличный стиль'],
  Авто: [
    'Классические авто',
    'Спорткары',
    'Внедорожники',
    'Электромобили',
    'Тюнинг',
    'Мотоциклы',
  ],
  Наука: ['Астрономия', 'Биология', 'Химия', 'Физика', 'Математика', 'Археология'],
  Образование: [
    'Иностранные языки',
    'Программирование',
    'Психология',
    'История',
    'Экономика',
    'Медицина',
  ],
}

const RUSSIAN_CITIES = [
  'Москва',
  'Санкт-Петербург',
  'Новосибирск',
  'Екатеринбург',
  'Казань',
  'Нижний Новгород',
  'Челябинск',
  'Самара',
  'Омск',
  'Ростов-на-Дону',
]

const GENDERS = [GenderPreference.MALE, GenderPreference.FEMALE, GenderPreference.ANYBODY]
const USER_GENDERS = [Gender.MALE, Gender.FEMALE]

const ADMIN_EMAIL = 'admin@boltaem.ru'
const ADMIN_PASSWORD = 'admin123'

function resolveUserStatus(index: number): UserStatus {
  if (index < 65) return UserStatus.REGISTERED
  if (index < 75) return UserStatus.NEW
  if (index < 85) return UserStatus.PENDING_APPROVEMENT
  return UserStatus.BANNED
}

export async function seedDev(prisma: PrismaClient): Promise<void> {
  console.log('🌱 Начинаем dev-заполнение базы данных...')
  console.log(`📁 Resources: ${RESOURCES_DIR}`)
  console.log(`🌐 Base URL: ${DEV_BASE_URL}`)

  console.log('🧹 Очистка старых dev-данных...')
  await prisma.post.deleteMany()
  await prisma.announcement.deleteMany()
  await prisma.interest.deleteMany()
  await prisma.category.deleteMany()
  await prisma.user.deleteMany()

  console.log('📂 Создание категорий и интересов...')
  let countryInterestIndex = 0
  let personalInterestIndex = 0
  for (const [categoryIndex, categoryData] of CATEGORIES.entries()) {
    const category = await prisma.category.create({
      data: {
        name: categoryData.name,
        isCountry: categoryData.isCountry,
        icon: categoryIcon(categoryIndex),
      },
    })

    const interestNames = INTERESTS_BY_CATEGORY[categoryData.name] || []
    for (const interestName of interestNames) {
      const image = categoryData.isCountry
        ? destinationImage(countryInterestIndex++)
        : interestImage(personalInterestIndex++)

      await prisma.interest.create({
        data: {
          name: interestName,
          categoryId: category.id,
          image,
        },
      })
    }
  }

  const allInterests = await prisma.interest.findMany()
  console.log(`✅ Создано интересов: ${allInterests.length}`)

  console.log('👤 Создание пользователей...')
  const users = []

  const adminInterests = pickUserInterests(allInterests)
  const admin = await prisma.user.create({
    data: {
      email: ADMIN_EMAIL,
      login: 'admin',
      password: await bcrypt.hash(ADMIN_PASSWORD, 10),
      age: 30,
      name: 'Админ',
      surname: 'Системный',
      gender: Gender.MALE,
      city: 'Москва',
      description: 'Администратор системы Boltaem',
      status: UserStatus.REGISTERED,
      role: UserRole.ADMIN,
      avatar: avatarImage(0),
      banner: bannerImage(0),
      lastSeen: new Date(),
      metadata: {
        preferences: {
          theme: 'dark',
          notifications: true,
        },
      },
      interests: {
        connect: adminInterests.map((interest) => ({ id: interest.id })),
      },
    },
  })
  users.push(admin)

  const userCount = 99
  for (let i = 0; i < userCount; i++) {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const email = faker.internet.email({ firstName, lastName }).toLowerCase()
    const userInterests = pickUserInterests(allInterests)

    const user = await prisma.user.create({
      data: {
        email,
        login: buildLogin(firstName, lastName, String(i)),
        password: await bcrypt.hash('password123', 10),
        age: faker.number.int({ min: 18, max: 99 }),
        name: firstName,
        surname: lastName,
        gender: faker.helpers.arrayElement(USER_GENDERS),
        city: faker.helpers.arrayElement(RUSSIAN_CITIES),
        description: faker.lorem.sentence({ min: 5, max: 15 }),
        status: resolveUserStatus(i),
        role: UserRole.USER,
        avatar: avatarImage(i + 1),
        banner: bannerImage(i + 1),
        lastSeen: faker.date.recent(),
        metadata: {
          preferences: {
            theme: faker.helpers.arrayElement(['light', 'dark']),
            notifications: faker.datatype.boolean(),
          },
        },
        interests: {
          connect: userInterests.map((interest) => ({ id: interest.id })),
        },
      },
    })
    users.push(user)
  }

  console.log(`✅ Создано пользователей: ${users.length}`)
  console.log(`   Админ: ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`)

  console.log('📝 Создание постов...')
  const postCount = 200
  for (let i = 0; i < postCount; i++) {
    const user = faker.helpers.arrayElement(users)
    const tags = faker.helpers.arrayElements(
      ['путешествия', 'спорт', 'еда', 'музыка', 'кино', 'технологии', 'природа', 'город'],
      faker.number.int({ min: 1, max: 4 }),
    )

    await prisma.post.create({
      data: {
        title: faker.lorem.sentence({ min: 3, max: 8 }),
        content: faker.lorem.paragraphs({ min: 2, max: 5 }),
        image: postImage(i),
        tags,
        status: faker.helpers.arrayElement([
          UserContentStatus.PUBLISHED,
          UserContentStatus.PUBLISHED,
          UserContentStatus.PUBLISHED,
          UserContentStatus.PENDING_APPROVEMENT,
          UserContentStatus.BANNED,
        ]),
        userId: user.id,
      },
    })
  }
  console.log(`✅ Создано постов: ${postCount}`)

  console.log('📢 Создание объявлений...')
  const announcementCount = 1000
  for (let i = 0; i < announcementCount; i++) {
    const user = faker.helpers.arrayElement(users)
    const selectedInterests = faker.helpers.arrayElements(
      allInterests,
      faker.number.int({ min: 2, max: 3 }),
    )

    const dateFrom = faker.date.between({ from: '2023-01-01', to: '2025-12-31' })
    const dateTo = faker.date.between({ from: dateFrom, to: '2026-01-01' })

    const city1 = faker.helpers.arrayElement(RUSSIAN_CITIES)
    let city2 = faker.helpers.arrayElement(RUSSIAN_CITIES)
    while (city2 === city1) {
      city2 = faker.helpers.arrayElement(RUSSIAN_CITIES)
    }

    await prisma.announcement.create({
      data: {
        title: faker.lorem.sentence({ min: 3, max: 8 }),
        description: faker.lorem.paragraphs({ min: 2, max: 5 }),
        dateFrom,
        dateTo,
        icon: announcementIcon(i),
        departure: city1,
        destination: city2,
        genderInterest: faker.helpers.arrayElement(GENDERS),
        status: faker.helpers.arrayElement([
          UserContentStatus.PUBLISHED,
          UserContentStatus.PUBLISHED,
          UserContentStatus.PUBLISHED,
          UserContentStatus.PENDING_APPROVEMENT,
          UserContentStatus.BANNED,
        ]),
        userId: user.id,
        interests: {
          connect: selectedInterests.map((interest) => ({ id: interest.id })),
        },
      },
    })
  }

  console.log(`✅ Создано объявлений: ${announcementCount}`)
  console.log('🎉 Dev-сиды успешно применены!')
}
