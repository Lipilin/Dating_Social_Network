import type { CategoryWithInterestResource, InterestResource, UserResource } from '@/utils/api/types'
import { InterestCategoryItem } from '@/components/pages/Registration/partials/InterestCategoryItem'
import styles from './ProfileEditForm.module.css'
import { useMemo } from 'react'

interface ProfileEditInterestsProps {
    profile: UserResource
    setUpdatedUser: (user: UserResource) => void
    categories: CategoryWithInterestResource[]
}

export function ProfileEditInterests({ profile, setUpdatedUser, categories }: ProfileEditInterestsProps) {
    const interestCategories = categories.filter((category) => category.isCountry === false)
    const selectedInterests = profile.interests ?? []

    const countryInterestIds = useMemo(() => {
        return new Set(
            categories
                .filter((category) => category.isCountry)
                .flatMap((category) => category.interests.map((interest) => interest.id))
        )
    }, [categories])

    const personalInterests = selectedInterests.filter((interest) => !countryInterestIds.has(interest.id))

    const handleInterestsChange = (interests: InterestResource[]) => {
        const countryInterests = selectedInterests.filter((interest) => countryInterestIds.has(interest.id))
        setUpdatedUser({ ...profile, interests: [...countryInterests, ...interests] })
    }

    return (
        <>
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
        </>
    )
}
