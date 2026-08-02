import { StepChanger } from './StepChanger'
import type { CategoryWithInterestResource } from '@/utils/api/types'
import { useState } from 'react'

interface InterestCategoryItemProps {
    category: CategoryWithInterestResource
}

function InterestCategoryItem({ category }: InterestCategoryItemProps) {
    const [open, setOpen] = useState(false)

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
                        <input type="checkbox" />
                        <span>{interest.name}</span>
                    </label>
                ))}
            </div>
        </div>
    )
}

interface InterestsStepProps {
    onNext: () => void
    onBack: () => void
    categories: CategoryWithInterestResource[]
}

export function InterestsStep({ onNext, onBack, categories }: InterestsStepProps) {
    return (
        <div className="secondStep">
            <div className="modal__body-top">
                <h3>Мои интересы</h3>
            </div>
            <div className="modal__body-form">
                <div className="interest">
                    {categories.map((category, index) => (
                        <InterestCategoryItem
                            key={category.id}
                            category={category}
                        />
                    ))}
                </div>
                <div className="row buttons">
                    <StepChanger direction="next" onChange={onNext} />
                    <StepChanger direction="previous" onChange={onBack} />
                </div>
            </div>
        </div>
    )
}
