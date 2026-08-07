import { useEffect, useState } from 'react'
import { Category } from '@/utils/api/Category'
import type { CategoryWithInterestResource } from '@/utils/api/types'
import { CategoryBLock } from '@/components/pages/MainPage/partials/interests/CategoryBlock'
import { Loader } from '@/components/pages/Loader/Loader'

const categoryService = new Category()
const ALL_CATEGORIES_TAKE = 100

function chunkItems<T>(items: T[], size: number): T[][] {
    const rows: T[][] = []

    for (let index = 0; index < items.length; index += size) {
        rows.push(items.slice(index, index + size))
    }

    return rows
}

export function InterestPage() {
    const [categories, setCategories] = useState<CategoryWithInterestResource[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        categoryService.getCategories({
            take: ALL_CATEGORIES_TAKE,
            skip: 0,
        }).then(setCategories).finally(() => {
            setIsLoading(false)
        })
    }, [])

    if(isLoading){
        return <Loader isLoading = { isLoading } />
    }

    const interestCategories = categories.filter((category) => !category.isCountry)

    if (interestCategories.length === 0) {
        return null
    }

    return (
        <section className="friends">
            <div className="container">
                <div className="row">
                    <div className="friends__content friends__content_full">
                        <h3>Друзья по интересам</h3>
                        <div className="friends__interests">
                            {chunkItems(interestCategories, 2).map((row, rowIndex) => (
                                <div className="friends__interests-row" key={rowIndex}>
                                    {row.map((category) => (
                                        <CategoryBLock key={category.id} category={category} />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
