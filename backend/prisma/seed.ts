import { PrismaClient } from '@prisma/client'
import { config } from 'dotenv'
import { seedDev } from './seedDev.js'
import { seedProd } from './seedProd.js'

config()

const prisma = new PrismaClient()

function isProdBuild(): boolean {
  return (
    process.env.NODE_ENV === 'prod'
    || process.env.NODE_ENV === 'production'
    || process.env.BUILD === 'prod'
  )
}

async function main(): Promise<void> {
  console.log('🌱 Запуск seed...')

  await seedProd(prisma)

  if (isProdBuild()) {
    console.log('🏭 Prod-режим: dev-сиды пропущены')
  } else {
    await seedDev(prisma)
  }

  console.log('🎉 Seed завершён!')
}

main()
  .catch((error) => {
    console.error('❌ Ошибка при заполнении базы:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
