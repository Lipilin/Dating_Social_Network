import type { CategoryWithInterestResource } from '@/utils/api/types'
import { DestinationBlock } from './DestinationBlock'
import { CategoryBLock } from './partials/interests/CategoryBlock'
import { ROUTES } from '@/config/General'
import { Link } from 'react-router'

interface InterestBlockProps {
    categories: CategoryWithInterestResource[]
}

function chunkItems<T>(items: T[], size: number): T[][] {
    const rows: T[][] = []

    for (let index = 0; index < items.length; index += size) {
        rows.push(items.slice(index, index + size))
    }

    return rows
}

export function InterestBlock({ categories }: InterestBlockProps) {
    const interestCategories = categories.filter((category) => !category.isCountry)

    if (interestCategories.length === 0) {
        return null
    }

    return (
        <>
            <div className="friends__content">
                <h3>Друзья по интересам</h3>
                <div className="friends__interests">
                    {chunkItems(interestCategories, 2).map((row, rowIndex) => (
                        <div className="friends__interests-row" key={rowIndex}>
                            {row.map((category) => (
                                <CategoryBLock key={category.id} category={category} />
                            ))}
                        </div>
                    ))}
                </div>
                <Link to={ROUTES.INTEREST.URL} className="friends__others">
                    Показать все интересы
                    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="16" viewBox="0 0 9 16" fill="none">
                        <path d="M1 14.5L7.5 8L1 1.5" stroke="#0041F2" strokeWidth="2" />
                    </svg>
                </Link>
            </div>
            <DestinationBlock categories={categories} />
        </>
    )
}
