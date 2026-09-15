import { useState, useCallback, useEffect } from 'react'
import { SearchGender } from './partials/searchForm/SearchGender'
import { SearchInterests } from './partials/searchForm/SearchInterests'
import { DefaultInput } from '@/components/ui/inputs/DefaultInput'
import { LoadStatus } from './types'
import { GENDER_PREFERENCE, type CategoryWithInterestResource, type InterestResource } from '@/utils/api/types'
import { DefaultButton } from "@/components/ui/buttons/DefaultButton"
import type { AnnouncementRequest } from '@/utils/api/types'
import { API_SETTINGS } from '@/config/General'

interface SeacrhFormProps{
    setData: (data: AnnouncementRequest) => void,
    loadStatus: LoadStatus, 
    categories: CategoryWithInterestResource[]
}

export function SearchForm({ setData, loadStatus, categories }: SeacrhFormProps) {
    const [genderPreference, setGenderPreference] = useState<GENDER_PREFERENCE | null>(null)
    const [purpose, setPurpose] = useState<InterestResource | null>(null)
    const [departure, setDeparture] = useState('')
    const [destination, setDestination] = useState('')
    const find = useCallback(async () => {
        setData({
            gender: genderPreference,
            purpose: purpose ? [purpose] : [],
            departure: departure,
            destination: destination,
            take: API_SETTINGS.DEFAULT_PAGINATION, 
            skip: 0
        })
    }, [genderPreference, departure, destination, purpose, setData])
    return (
        <section className="search">
            <div className="container">
                { loadStatus == LoadStatus.READY ? 
                    <form action="#">
                        <div className="search__top">
                            <SearchGender 
                                genderValue={genderPreference}
                                setGender={ (value) => setGenderPreference(value) }
                            />
                            <SearchInterests 
                                value={ purpose } 
                                setValue={ setPurpose } 
                                categories={ categories }
                            />
                            <div className="search__top-item">
                                <div className="place">
                                    <DefaultInput 
                                        label = 'От куда'
                                        value = { departure }
                                        setValue = { setDeparture }
                                    />
                                </div>
                            </div>
                            <div className="search__top-item">
                                <div className="place">
                                    <DefaultInput 
                                        label = 'Куда'
                                        value = { destination }
                                        setValue = { setDestination }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="search__bottom">
                            <div className="search__bottom-right">
                                <DefaultButton 
                                    classNames='show_map'
                                    content='Показать на карте'
                                    onSend={ find }
                                />
                                <DefaultButton 
                                    classNames='search__btn'
                                    content='Найти'
                                    onSend = { find }
                                />
                            </div>
                        </div>
                    </form>
                : null}
            </div>
        </section>
    )
}