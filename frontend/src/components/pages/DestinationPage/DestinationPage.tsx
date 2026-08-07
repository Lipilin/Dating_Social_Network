import { useEffect, useState } from 'react'
import { Category } from '@/utils/api/Category'
import type { CategoryWithInterestResource } from '@/utils/api/types'
import { ROUTES } from '@/config/General'
import { Link } from 'react-router'
import { Loader } from '@/components/pages/Loader/Loader'

const categoryService = new Category()
const ALL_CATEGORIES_TAKE = 100

export function DestinationPage() {
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

    const destinationCategory = categories.find((category) => category.isCountry)

    if (!destinationCategory) {
        return null
    }

    return (
        <section className="friends">
            <div className="container">
                <div className="row">
                    <div className="friends__directions friends__directions_full">
                        <h3>Направления</h3>
                        <div className="countries">
                            {destinationCategory.interests.map((destination) => (
                                <Link
                                    to={ROUTES.DESTINATION.URL}
                                    className="country__item"
                                    key={destination.id}
                                >
                                    <img src={destination.image || 'test.svg'} alt="" />
                                    {destination.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
