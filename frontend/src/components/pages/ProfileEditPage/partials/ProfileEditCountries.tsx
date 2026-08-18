import styles from './ProfileEditForm.module.css'
import type { ProfileEditFormProps } from './ProfileEditForm'
import type { CategoryWithInterestResource, InterestResource } from '@/utils/api/types'
import { useCallback, useMemo } from 'react'

type ProfileEditCountriesProps = ProfileEditFormProps & {
    categories: CategoryWithInterestResource[]
}

export function ProfileEditCountries({ profile, setUpdatedUser, categories }: ProfileEditCountriesProps) {
    const selectedInterests = profile.interests ?? []

    const countryCategories = useMemo(() => {
        return categories.filter((category) => category.isCountry)
    }, [categories])

    const countryInterestIds = useMemo(() => {
        return new Set(
            countryCategories.flatMap((category) => category.interests.map((interest) => interest.id))
        )
    }, [countryCategories])

    const isSelected = useCallback(
        (interest: InterestResource) => selectedInterests.some((item) => item.id === interest.id),
        [selectedInterests]
    )

    const handleCountryChange = useCallback(
        (interest: InterestResource) => {
            const currentInterests = profile.interests ?? []
            const personalInterests = currentInterests.filter((item) => !countryInterestIds.has(item.id))
            const countryInterests = currentInterests.filter((item) => countryInterestIds.has(item.id))
            const alreadySelected = countryInterests.some((item) => item.id === interest.id)
            const nextCountryInterests = alreadySelected
                ? countryInterests.filter((item) => item.id !== interest.id)
                : [...countryInterests, interest]

            setUpdatedUser({
                ...profile,
                interests: [...personalInterests, ...nextCountryInterests],
            })
        },
        [profile, setUpdatedUser, countryInterestIds]
    )

    return (
        <div className={styles.profileEditCountries}>
            {countryCategories.map((category) =>
                category.interests.map((interest) => (
                    <label key={interest.id}>
                        <input
                            type="checkbox"
                            checked={isSelected(interest)}
                            onChange={() => handleCountryChange(interest)}
                        />
                        <span>{interest.name}</span>
                    </label>
                ))
            )}
        </div>
    )
}
