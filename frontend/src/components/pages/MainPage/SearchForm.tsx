import { useState, useCallback, useEffect } from 'react'
import { SearchGender } from './partials/searchForm/SearchGender'
import { SearchInterests } from './partials/searchForm/SearchInterests'
import { DefaultInput } from '@/components/ui/inputs/DefaultInput'
import { LoadStatus } from './types'
import { GENDER_PREFERENCE, type CategoryWithInterestResource } from '@/utils/api/types'
import { DefaultButton } from "@/components/ui/buttons/DefaultButton"

interface SeacrhFormProps{
    setData: (data: any) => void,
    loadStatus: LoadStatus, 
    categories: CategoryWithInterestResource[]
}

export function SearchForm({ setData, loadStatus, categories }: SeacrhFormProps) {
    const [genderPreference, setGenderPreference] = useState<GENDER_PREFERENCE | null>(null)
    const [purpose, setPurpose] = useState<CategoryWithInterestResource | null>(null)
    const [departure, setDeparture] = useState('')
    const [destination, setDestination] = useState('')
    const [error, setError] = useState<string>('')
    const find = useCallback(async () => {
        setError('')
        try {
            if(!genderPreference) throw Error('Поле Я ищу нe может быть пустым')
            if(!purpose) throw Error('Поле Цель не может быть пустым')
            if(departure == '') throw Error('Поле Откуда нe может быть пустым')
            if(destination == '') throw Error('Поле Куда нe может быть пустым')
        } catch (errorObject) {
            setError((errorObject as Error).message)
            return
        }
        setData({})
    }, [genderPreference, departure, destination, purpose, setData])
    useEffect(() => setError(''), [genderPreference, departure, destination, purpose])
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
                        { error ? (
                            <span className='text-red-600 text-sm mt-1 block'>
                                {error}
                            </span>
                        ) : null }
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