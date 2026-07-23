import { useEffect, useState } from 'react'
import type { CategoryWithInterestResource } from '@/utils/api/types'
import { LoadStatus } from './types'
import { Category } from '@/utils/api/Category'
import { DestinationBlock } from './DestinationBlock'

interface InterestBlockProps{
    dataProvider: Category
}

export function InterestBlock({ dataProvider }: InterestBlockProps) {
    const [categories, setCategories] = useState<CategoryWithInterestResource[]>([])
    const [loadStatus, setLoadStatus] = useState<LoadStatus>(LoadStatus.LOADING)
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
                <a href="#" className="friends__others">
                    Показать все интересы
                    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="16" viewBox="0 0 9 16"
                        fill="none">
                        <path d="M1 14.5L7.5 8L1 1.5" stroke="#0041F2" strokeWidth="2" />
                    </svg>
                </a>
            </div>
            <DestinationBlock categories={ categories }/>
            </>
        ) : null}
        </>
    )
}
