export const DEFAULT_EMAIL_MESSAGE = {
  id: 1,
  from: 'support@boltaem.ru',
  subject: 'Boltaem — сообщение от пользователя',
  content: `
    <p>Здравствуйте!</p>
    <p>Вы получили новое сообщение через форму обратной связи Boltaem.</p>
    <p>С уважением,<br/>Команда Boltaem</p>
  `.trim(),
} as const

export const REGISTRATION_EMAIL_MESSAGE = {
  id: 3,
  from: 'support@boltaem.ru',
  subject: 'Boltaem — подтверждение регистрации',
  content: `
    <p>Здравствуйте!</p>
    <p>Спасибо за регистрацию в Boltaem.</p>
    <p>Для подтверждения email перейдите по ссылке:</p>
    <p><a href="{{confirmLink}}">Подтвердить регистрацию</a></p>
    <p>Если вы не регистрировались в Boltaem, просто проигнорируйте это письмо.</p>
    <p>С уважением,<br/>Команда Boltaem</p>
  `.trim(),
} as const

export const PASSWORD_RESET_EMAIL_MESSAGE = {
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

export const EMAIL_MESSAGE_IDS = {
  DEFAULT: DEFAULT_EMAIL_MESSAGE.id,
  PASSWORD_RESET: PASSWORD_RESET_EMAIL_MESSAGE.id,
  REGISTRATION: REGISTRATION_EMAIL_MESSAGE.id,
} as const

export const EMAIL_MESSAGES = [
  DEFAULT_EMAIL_MESSAGE,
  PASSWORD_RESET_EMAIL_MESSAGE,
  REGISTRATION_EMAIL_MESSAGE,
] as const
