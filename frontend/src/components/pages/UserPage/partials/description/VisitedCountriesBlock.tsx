import type { InterestResource } from '@/utils/api/types'
import { Link } from 'react-router'

interface VisitedCountriesBlockProps{
    interests: InterestResource[]
}

export function VisitedCountriesBlock({ interests }: VisitedCountriesBlockProps) {
    return (
        <div className="friends__directions">
            <h3>Любимые направления</h3>
            <div className="countries">
                { interests.length == 0 ? (<p>Пока нет любимых направлений</p>) : (
                    <>
                        {interests.map((country) => (
                            <Link key={ country.id } to="#" className="country__item">
                                <img src={ country.image } alt="" />
                                { country.name }
                            </Link>
                        ))}
                    </>
                ) }
            </div>
        </div>
    )
}
