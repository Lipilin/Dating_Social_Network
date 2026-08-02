import type { CategoryWithInterestResource, InterestResource } from '@/utils/api/types'
import { DefaultDropdown, type Label } from '@/components/ui/dropdowns/DefaultDropdown'
import { useMemo } from 'react'

interface SearchInterestsProps{
    value: InterestResource | null, 
    setValue: (value: InterestResource | null) => void,
    categories: CategoryWithInterestResource[]
}

function categoriesToLabels(categories: CategoryWithInterestResource[]){
    return categories.filter((item) => !item.isCountry).map((category) => {
        return category.interests.map((interest) => {
            return {
                label: interest.name,
                value: interest,
                id: interest.id,
            }
        })
    }).flat()
}

export function SearchInterests({ value, setValue, categories }: SearchInterestsProps){
    const labels = useMemo(() => categoriesToLabels(categories), [categories])
    return (
        <>
        <DefaultDropdown
            value={ value }
            setValue={ setValue }
            labels = { labels }
            placeholder="Цель"
        />
        </>
    )
}