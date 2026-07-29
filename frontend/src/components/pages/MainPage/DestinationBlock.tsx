import * as Images from './MainPage.images'
import type { CategoryWithInterestResource } from '@/utils/api/types'
import { HrefWithImage } from '@/components/ui/hrefs/HrefWithImage'
import { default as showCategories } from '@/assets/images/show-announcements.svg'

interface DestinationBlockProps{
    categories: CategoryWithInterestResource[]
}

export function DestinationBlock({ categories }: DestinationBlockProps) {
    return (
        <div className="friends__right">
            <div className="friends__directions">
                <h3>Направления</h3>
                <div className="countries">
                    {categories.filter((category) => category.isCountry == true).map((category) => (
                        <a href="#" className="country__item" key = {category.id}>
                            <img src={Images.turkeyPng} alt="" />
                            {category.name}
                        </a>
                    ))}
                </div>
                <HrefWithImage 
                    classNames="friends__others"
                    link="/destinations"
                    content="Показать все направления"
                    image = { showCategories }
                />
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
