import { useEffect, useState } from 'react'
import type { CategoryWithInterestResource } from '@/utils/api/types'
import { LoadStatus } from './types'
import { Category } from '@/utils/api/Category'
import { DestinationBlock } from './DestinationBlock'
import { HrefWithImage } from '@/components/ui/hrefs/HrefWithImage'
import { default as showCategories } from '@/assets/images/show-announcements.svg'

interface InterestBlockProps{
    dataProvider: Category
}

export function InterestBlock({ dataProvider }: InterestBlockProps) {
    const [ categories, setCategories ] = useState<CategoryWithInterestResource[]>([])
    const [ loadStatus, setLoadStatus ] = useState<LoadStatus>(LoadStatus.LOADING)
    useEffect(() => {
        async function getCategories(){
            const data: CategoryWithInterestResource[] = await dataProvider.getAllCategoriesWithInterests()
            setCategories(data)
            setLoadStatus(LoadStatus.READY)
        }
        getCategories()
    }, [])
    return (
        <>
            {loadStatus === LoadStatus.READY ? (
                <>
                    <div className="friends__content">
                        <h3>Друзья по интересам</h3>
                        {categories.filter((category) => category.isCountry == false).map((category) => (
                            <div className="friends__interests" key = {category.id}>
                                <div className="friends__interests-row">
                                    <div className="friends__interests-item">
                                        <h4>
                                            <img src={ category.image } alt={category.name} />
                                            { category.name }
                                        </h4>
                                        {category.interests.map((interest) => (
                                            <div className="friends__actions" key = {category.id}>
                                                <a href="#">{ interest.name }</a>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <HrefWithImage 
                            classNames="friends__others"
                            link="/interests"
                            content="Показать все интересы"
                            image = { showCategories }
                        />
                    </div>
                    <DestinationBlock categories={ categories }/>
                </>
            ) : null}
        </>
    )
}
