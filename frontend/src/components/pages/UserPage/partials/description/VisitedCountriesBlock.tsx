import type { InterestResource } from '@/utils/api/types'

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
                            <a key={ country.id } href="#" className="country__item">
                                <img src={ country.image } alt="" />
                                { country.name }
                            </a>
                        ))}
                    </>
                ) }
            </div>
        </div>
    )
}
