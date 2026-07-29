import selectArrowSvg from '@/assets/images/select_arrow.svg'
import type { CategoryWithInterestResource } from '@/utils/api/types'

interface SearchInterestsProps{
    categories: CategoryWithInterestResource[]
}

export function SearchInterests({categories}: SearchInterestsProps){
    return (
        <div className="input-data">
        <input type="text" required={true} id="selected-values-2" />
        <label className="label" htmlFor="">Цель</label>
        <img src={selectArrowSvg} alt="" className="arrow-toogle" />
        <div className="checkbox-list">
            {categories.map((category) => (
                <label className="label-list" key={category.id}>
                    <input type="checkbox" name="interests" value={category.id} />
                    <span>{category.name}</span>
                </label>
            ))}
        </div>
        </div>
    )
}