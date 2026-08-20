import type { InterestResource } from '@/utils/api/types'
import { useContext, useMemo } from 'react'
import { Link } from 'react-router'
import { useNavigate } from 'react-router'
import { ROUTES } from '@/config/General'
import { ProfileContext } from '@/utils/context/ProfileContext'
import { ProfileSectionEmpty } from '../ProfileSectionEmpty'

interface InterestsBlockProps {
    interests: InterestResource[]
    userId: number
}

interface GroupedCategory {
    name: string
    icon?: string
    interests: InterestResource[]
}

function groupInterestsByCategory(interests: InterestResource[]): GroupedCategory[] {
    const grouped = new Map<string, GroupedCategory>()

    interests.forEach((interest) => {
        if (!interest.category || interest.category.isCountry || !interest.category.name) return

        const existing = grouped.get(interest.category.name)
        if (existing) {
            existing.interests.push(interest)
            return
        }

        grouped.set(interest.category.name, {
            name: interest.category.name,
            icon: interest.category.icon,
            interests: [interest],
        })
    })

    return Array.from(grouped.values())
}

function chunkItems<T>(items: T[], size: number): T[][] {
    const rows: T[][] = []
    for (let index = 0; index < items.length; index += size) {
        rows.push(items.slice(index, index + size))
    }
    return rows
}

export function InterestsBlock({ interests, userId }: InterestsBlockProps) {
    const { user: currentUser } = useContext(ProfileContext)
    const navigate = useNavigate()
    const isOwnProfile = currentUser?.id === userId
    const categories = useMemo(() => groupInterestsByCategory(interests), [interests])
    const rows = useMemo(() => chunkItems(categories, 2), [categories])

    return (
        <div className="friends__content">
            <h3>Интересы</h3>
            <div className="friends__interests">
                {categories.length === 0 ? (
                    <ProfileSectionEmpty
                        compact
                        title="Интересы пока не выбраны"
                        buttonText={isOwnProfile ? 'Добавить интересы' : undefined}
                        onAction={isOwnProfile ? () => navigate(ROUTES.PROFILE_EDIT.URL) : undefined}
                    />
                ) : (
                    rows.map((row, rowIndex) => (
                        <div className="friends__interests-row" key={rowIndex}>
                            {row.map((category) => (
                                <div className="friends__interests-item" key={category.name}>
                                    <h4>
                                        {category.icon && <img src={category.icon} alt="" />}
                                        {category.name}
                                    </h4>
                                    <div className="friends__actions">
                                        {category.interests.map((interest) => (
                                            <Link key={interest.id} to="#">
                                                {interest.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
