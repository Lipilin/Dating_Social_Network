import { useState, useCallback } from 'react'
import { SearchGender } from './partials/searchForm/SearchGender'
import { SearchInterests } from './partials/searchForm/SearchInterests'
import { SearchBottom } from './partials/searchForm/SearchBottom'
import { DefaultInput } from '@/components/ui/inputs/DefaultInput'
import type { Announcement } from '@/utils/api/Announcement'
import { LoadStatus } from './types'
import { GENDER_PREFERENCE } from '@/utils/api/types'

interface SeacrhFormProps{
    dataProvider: Announcement
}

export function SearchForm({ dataProvider }: SeacrhFormProps) {
    const [genderPreference, setGenderPreference] = useState<GENDER_PREFERENCE | null>(null)
    const [departure, setDeparture] = useState('')
    const [destination, setDestination] = useState('')
    const [status, setStatus] = useState<LoadStatus>(LoadStatus.READY)
    const find = useCallback(async () => {
        setStatus(LoadStatus.LOADING)
        const data = await dataProvider.getDataWithClauses()
    }, [departure, destination])
    return (
        <section className="search">
            <div className="container">
                { status == LoadStatus.READY ? 
                    <form action="#">
                        <div className="search__top">
                            <SearchGender 
                                genderValue={genderPreference}
                                setGender={ (value) => setGenderPreference(value) }
                            />
                            <div className="search__top-item">
                                <SearchInterests categories={[]}/>
                            </div>
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
                        <SearchBottom />
                    </form>
                : null}
            </div>
        </section>
    )
}