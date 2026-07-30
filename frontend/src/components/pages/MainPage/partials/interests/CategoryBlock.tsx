import type { CategoryWithInterestResource } from '@/utils/api/types'

interface CategoryBlockProps {
    category: CategoryWithInterestResource
}

export function CategoryBLock({ category }: CategoryBlockProps) {
    return (
        <div className="friends__interests-item">
            <h4>
                <img src={category.image} alt="" />
                {category.name}
            </h4>
            <div className="friends__actions">
                {category.interests.map((interest) => (
                    <a href="#" key={interest.id}>{interest.name}</a>
                ))}
            </div>
        </div>
    )
}
