import type { CategoryWithInterestResource, InterestResource } from '@/utils/api/types'
import { InterestCategoryItem } from '@/components/pages/Registration/partials/InterestCategoryItem'
import styles from './ProfileEditForm.module.css'
import { useMemo } from 'react'
import type { ProfileEditFormProps } from './ProfileEditForm'

interface ProfileEditInterestsProps extends ProfileEditFormProps {
    categories: CategoryWithInterestResource[]
}

export function ProfileEditInterests({ updatedUserRequest, setUpdatedUserRequest, categories }: ProfileEditInterestsProps) {
    const { updatedUser } = updatedUserRequest
    const interestCategories = categories.filter((category) => category.isCountry === false)
    const selectedInterests = updatedUser.interests ?? []

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
        setUpdatedUserRequest({ 
            ...updatedUserRequest, 
            updatedUser: { ...updatedUser, interests: [...countryInterests, ...interests] },
        })
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
