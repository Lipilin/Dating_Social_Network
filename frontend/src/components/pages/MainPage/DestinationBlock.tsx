import * as Images from './MainPage.images'
import type { CategoryWithInterestResource } from '@/utils/api/types'
import { ROUTES } from '@/config/General'

interface DestinationBlockProps {
    categories: CategoryWithInterestResource[]
}

const MAX_DESTINATION_ITEMS = 8

export function DestinationBlock({ categories }: DestinationBlockProps) {
    const destinationCategory = categories.find((category) => category.isCountry)

    return (
        <div className="friends__right">
            <div className="friends__directions">
                <h3>Направления</h3>
                { destinationCategory && (
                    <>
                        <div className="countries">
                            {destinationCategory.interests.slice(0, MAX_DESTINATION_ITEMS).map((category) => (
                                <a href={ROUTES.DESTINATION.URL} className="country__item" key={category.id}>
                                    <img src={category.image || "test.svg"}/>
                                    {category.name}
                                </a>
                            ))}
                        </div>
                        <a href={ROUTES.DESTINATION.URL} className="friends__others">
                            Показать все направления
                            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="16" viewBox="0 0 9 16" fill="none">
                                <path d="M1 14.5L7.5 8L1 1.5" stroke="#0041F2" strokeWidth="2" />
                            </svg>
                        </a>
                    </>
                ) }
            </div>
            <div className="friends__help">
                <div className="texts">
                    <h3>Нужна помощь?</h3>
                    <a href="#">Написать в поддержку</a>
                </div>
                <img src={Images.helpIconSvg} alt="" />
            </div>
        </div>
    )
}
