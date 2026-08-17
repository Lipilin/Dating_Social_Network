import { useContext, useEffect, useState } from 'react'
import { ROUTES } from '@/config/General'
import { Link } from 'react-router'
import { Loader } from '@/components/pages/Loader/Loader'
import { CategoryContext } from '@/utils/context/CategoryContext'

export function DestinationPage() {
    const { categories, isLoaded } = useContext(CategoryContext)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (isLoaded) {
            setIsLoading(false)
        }
    }, [isLoaded])

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
