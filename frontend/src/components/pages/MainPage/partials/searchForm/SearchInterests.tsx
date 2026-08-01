import type { CategoryWithInterestResource } from '@/utils/api/types'
import { DefaultDropdown, type Label } from '@/components/ui/dropdowns/DefaultDropdown'
import { useMemo } from 'react'

interface SearchInterestsProps{
    value: CategoryWithInterestResource | null, 
    setValue: (value: CategoryWithInterestResource) => void,
    categories: CategoryWithInterestResource[]
}

function categoriesToLabels(categories: CategoryWithInterestResource[]){
    return categories.map((category) => {
        return {
            label: category.name,
            value: category,  
            id: category.id, 
        }
    })
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