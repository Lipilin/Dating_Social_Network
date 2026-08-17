import type { CategoryWithInterestResource, InterestResource, UserResource } from '@/utils/api/types'
import { InterestCategoryItem } from '@/components/pages/Registration/partials/InterestCategoryItem'
import styles from './ProfileEditForm.module.css'

interface ProfileEditInterestsProps {
    profile: UserResource
    setUpdatedUser: (user: UserResource) => void
    categories: CategoryWithInterestResource[]
    isCountry: boolean
}

export function ProfileEditInterests({ profile, setUpdatedUser, categories, isCountry }: ProfileEditInterestsProps) {
    const interestCategories = categories.filter((category) => category.isCountry === isCountry)
    const selectedInterests = profile.interests ?? []

    const handleInterestsChange = (interests: InterestResource[]) => {
        const countryInterests = selectedInterests.filter((interest) => interest.category?.isCountry)
        setUpdatedUser({ ...profile, interests: [...countryInterests, ...interests] })
    }

    const personalInterests = selectedInterests.filter((interest) => !interest.category?.isCountry)

    return (
        <div className={styles.profileEditInterests}>
            <div className="interest">
                {interestCategories.map((category) => (
                    <InterestCategoryItem
                        key={category.id}
                        category={category}
                        selectedInterests={personalInterests}
                        onInterestsChange={handleInterestsChange}
                    />
                ))}
            </div>
        </div>
    )
}
