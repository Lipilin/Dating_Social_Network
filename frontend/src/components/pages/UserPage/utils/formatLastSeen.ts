const MS_IN_MINUTE = 60000
const ONLINE_THRESHOLD_MINUTES = 10

export function formatLastSeen(lastSeen: string): { text: string; isOnline: boolean } {
    const date = new Date(lastSeen)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMinutes = Math.floor(diffMs / MS_IN_MINUTE)

    if (diffMinutes < ONLINE_THRESHOLD_MINUTES) {
        return { text: 'сейчас в сети', isOnline: true }
    }

    const diffHours = Math.floor(diffMinutes / 60)
    if (diffHours < 24) {
        const label = diffHours === 1 ? 'час' : diffHours < 5 ? 'часа' : 'часов'
        return { text: `была в сети ${diffHours} ${label} назад`, isOnline: false }
    }

    const diffDays = Math.floor(diffHours / 24)
    if (diffDays < 7) {
        const label = diffDays === 1 ? 'день' : diffDays < 5 ? 'дня' : 'дней'
        return { text: `была в сети ${diffDays} ${label} назад`, isOnline: false }
    }

    return {
        text: `была в сети ${date.toLocaleDateString('ru-RU')}`,
        isOnline: false,
    }
}
