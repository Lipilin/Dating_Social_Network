import { prisma } from '@/prisma.js'
import type { EmailMessage } from '@prisma/client'
import {
    EMAIL_MESSAGE_IDS,
} from '@pick-me-up/common/emailMessages.js'
import { EMAIL_NOTIFICATION_ERROR_MESSAGE } from '@/config/emailNotificationMessages.js'
import { sendMail } from '@/utils/other/mailSender.js'
import { buildEmailNotificationLink } from '@/utils/other/emailNotificationLink.js'
import { generateEmailConfirmationToken } from '@/utils/other/emailConfirmationToken.js'
import { generatePasswordResetToken } from '@/utils/other/passwordResetToken.js'

function applyTemplate(content: string, variables: Record<string, string>): string {
    return Object.entries(variables).reduce(
        (result, [key, value]) => result.replaceAll(`{{${key}}}`, value),
        content,
    )
}

export class EmailNotificationService {
    async getById(id: number): Promise<EmailMessage | null> {
        return prisma.emailMessage.findUnique({
            where: { id },
        })
    }

    async sendRegistrationEmail(
        email: string,
        name: string,
        login: string,
    ): Promise<void> {
        const token = await generateEmailConfirmationToken(email, name, login)
        const confirmLink = buildEmailNotificationLink('CONFIRM_REGISTRATION', token)

        await this.#sendTemplatedEmail(
            EMAIL_MESSAGE_IDS.REGISTRATION,
            email,
            { confirmLink },
        )
    }

    async sendPasswordResetEmail(
        email: string,
        id: number,
        login: string,
    ): Promise<void> {
        const token = await generatePasswordResetToken(email, id, login)
        const resetLink = buildEmailNotificationLink('PASSWORD_RESET', token)

        await this.#sendTemplatedEmail(
            EMAIL_MESSAGE_IDS.PASSWORD_RESET,
            email,
            { resetLink },
        )
    }

    async #sendTemplatedEmail(
        templateId: number,
        to: string,
        variables: Record<string, string>,
    ): Promise<void> {
        const template = await this.getById(templateId)

        if (!template) {
            throw new Error(EMAIL_NOTIFICATION_ERROR_MESSAGE.TEMPLATE_NOT_FOUND)
        }

        console.log(await sendMail({
            from: process.env.SMTP_USER || template.from,
            to,
            subject: template.subject,
            html: applyTemplate(template.content, variables),
        }))
    }
}
