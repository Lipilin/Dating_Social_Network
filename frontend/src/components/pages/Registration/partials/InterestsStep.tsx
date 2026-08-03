import { StepChanger } from './StepChanger'
import type { CategoryWithInterestResource, UserPostRequest } from '@/utils/api/types'
import { InterestCategoryItem } from './InterestCategoryItem'


interface InterestsStepProps {
    onNext: () => void
    onBack: () => void
    categories: CategoryWithInterestResource[]
    user: UserPostRequest
    setUserData: (user: UserPostRequest) => void
}

export function InterestsStep({ onNext, onBack, categories, user, setUserData }: InterestsStepProps) {
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
                            setUserData = { setUserData }
                            user = { user }
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
