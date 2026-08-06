import type { CategoryWithInterestResource } from '@/utils/api/types'
import { ROUTES } from '@/config/General'
import { Link } from 'react-router'

interface CategoryBlockProps {
    category: CategoryWithInterestResource
}

export function CategoryBLock({ category }: CategoryBlockProps) {
    return (
        <div className="friends__interests-item">
            <h4>
                <img src={category.icon} alt="" />
                {category.name}
            </h4>
            <div className="friends__actions">
                {category.interests.map((interest) => (
                    <Link to={ROUTES.INTEREST.URL} key={interest.id}>{interest.name}</Link>
                ))}
            </div>
        </div>
    )
}
