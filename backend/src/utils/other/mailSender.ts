import nodemailer from 'nodemailer'

interface SendMailOptions {
    from: string
    to: string
    subject: string
    html: string
}

function createTransport() {
    const host = process.env.SMTP_HOST
    const port = Number(process.env.SMTP_PORT || 587)
    const user = process.env.SMTP_USER
    const pass = process.env.SMTP_PASS

    if (!host || !user || !pass) {
        return null
    }

    return nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
    })
}

export async function sendMail(options: SendMailOptions): Promise<void> {
    const transport = createTransport()

    if (!transport) {
        console.log('[mail] SMTP не настроен, письмо не отправлено:', {
            to: options.to,
            subject: options.subject,
        })
        return
    }

    await transport.sendMail(options)
}
