import type { CategoryWithInterestResource, InterestResource } from '@/utils/api/types'
import { useState } from 'react'


interface InterestCategoryItemProps {
    category: CategoryWithInterestResource
    selectedInterests: InterestResource[]
    onInterestsChange: (interests: InterestResource[]) => void
}

export function InterestCategoryItem({ category, selectedInterests, onInterestsChange }: InterestCategoryItemProps) {
    const [open, setOpen] = useState(false)

    const isSelected = (interest: InterestResource) =>
        selectedInterests.some((item) => item.id === interest.id)

    return (
        <div className="interest__item">
            <div
                className={`interest__item-head${open ? ' active' : ''}`}
                onClick={() => setOpen((prev) => !prev)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    e.preventDefault()
                    setOpen((prev) => !prev)
                }}
            >
                <img src={ category.image } alt="" />
                { category.name }
            </div>
            <div className={`interest__item-body${open ? ' show' : ''}`}>
                {category.interests.map((interest) => (
                    <label key={interest.id}>
                        <input
                            type="checkbox"
                            checked={isSelected(interest)}
                            onChange={() => {
                                if (isSelected(interest)) {
                                    onInterestsChange(selectedInterests.filter((item) => item.id !== interest.id))
                                } else {
                                    onInterestsChange([...selectedInterests, interest])
                                }
                            }}
                        />
                        <span>{interest.name}</span>
                    </label>
                ))}
            </div>
        </div>
    )
}