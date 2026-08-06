import { Fragment, useMemo } from 'react'
import type { InterestResource } from '@/utils/api/types'
import { ROUTES } from '@/config/General'
import styles from './AnnouncementInterestsBlock.module.css'
import { Link } from 'react-router'

interface AnnouncementInterestsBlockProps {
    interests?: InterestResource[]
}

function groupInterestsByCategory(interests: InterestResource[]): Record<string, InterestResource[]> {
    const groups: Record<string, InterestResource[]> = {}

    interests.forEach((interest) => {
        if (!interest.category || interest.category.isCountry) return

        const categoryName = interest.category.name
        const block = groups[categoryName] || []
        block.push(interest)
        groups[categoryName] = block
    })

    return groups
}

function buildInterestRows(groups: Record<string, InterestResource[]>): string[][] {
    const rows: string[][] = []

    Object.keys(groups).forEach((name, index) => {
        if (index % 2 === 0) {
            rows.push([name])
        } else {
            rows[rows.length - 1].push(name)
        }
    })

    return rows
}

export function AnnouncementInterestsBlock({ interests = [] }: AnnouncementInterestsBlockProps) {
    const interestGroups = useMemo(() => groupInterestsByCategory(interests), [interests])
    const interestRows = useMemo(() => buildInterestRows(interestGroups), [interestGroups])

    if (interests.length === 0) {
        return (
            <div className={styles.block}>
                <h3 className={styles.title}>Интересы</h3>
                <p className={styles.empty}>Интересы не указаны</p>
            </div>
        )
    }
    return (
        <div className={styles.block}>
            <h3 className={styles.title}>Интересы</h3>
            <div className={styles.interests}>
                {interestRows.map((row, rowIndex) => (
                    <div className={styles.row} key={rowIndex}>
                        {row.map((categoryName) => (
                            <Fragment key={categoryName}>
                                <div className={styles.category}>
                                    <h4 className={styles.categoryTitle}>
                                        {interestGroups[categoryName][0]?.category?.image && (
                                            <img
                                                src={interestGroups[categoryName][0].category!.image}
                                                alt=""
                                            />
                                        )}
                                        {categoryName}
                                    </h4>
                                    <div className={styles.tags}>
                                        {interestGroups[categoryName].map((interest) => (
                                            <Link
                                                key={interest.id}
                                                to={ROUTES.INTEREST.URL}
                                                className={styles.tag}
                                            >
                                                {interest.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </Fragment>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}
