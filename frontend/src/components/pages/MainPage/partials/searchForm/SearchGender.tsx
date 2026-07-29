import selectArrowSvg from '@/assets/images/select_arrow.svg'
import { GENDER_PREFERENCE } from '@/utils/api/types'

export function SearchGender(){
    return (
        <div className="search__top-item">
            <div className="input-data">
            <input type="text" required={true} id="selected-values" />
            <label className="label" htmlFor="">Я ищу</label>
            <img src={selectArrowSvg} alt="" className="arrow-toogle" />
            <div id="checkbox-list" className="checkbox-list">
                <label className="label-list">
                    <input type="checkbox" name="search_option" value={GENDER_PREFERENCE.FEMALE} />
                    <span>Девушку</span>
                </label>
                <label className="label-list">
                    <input type="checkbox" name="search_option" value={GENDER_PREFERENCE.MALE} />
                    <span>Парня</span>
                </label>
                <label className="label-list">
                    <input type="checkbox" name="search_option" value={GENDER_PREFERENCE.ANYBODY} id="kogo_nibud" />
                    <span>Кого нибудь</span>
                </label>
            </div>
            </div>
        </div>
    )
}