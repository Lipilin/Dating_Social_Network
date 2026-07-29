import React, { useState, useCallback } from 'react'
import selectArrowSvg from '@/assets/images/select_arrow.svg'
import { GENDER_PREFERENCE } from '@/utils/api/types'
import { genderLabels } from '@/config/General'

interface SearchGenderProps{
    genderValue: GENDER_PREFERENCE | null, 
    setGender: (value: GENDER_PREFERENCE) => void
}

export function SearchGender({ genderValue, setGender }: SearchGenderProps){
    const [open, setOpen] = useState(false)
    const changeHandler = useCallback((e: React.FocusEvent<HTMLDivElement>) => {
        setOpen(e.currentTarget.contains(e.relatedTarget))
    }, [])
    return (
        <div className="search__top-item">
            <div 
                className="input-data"
                onFocus={ (e) => setOpen(true) }
                onBlur={ changeHandler }
            >
                <input 
                    type="text"
                    required={true}
                    id="selected-values" 
                    value = { genderValue ? genderLabels[genderValue].label : ''}
                    placeholder=" "
                />
                <label className="label" >Я ищу</label>
                <img src={selectArrowSvg} alt="" className="arrow-toogle"/>
                { open ? 
                    <div id="checkbox-list" className="checkbox-list visible bottom" onMouseDown = { (e) => {e.preventDefault()} }>
                        {Object.values(genderLabels).map((item) => 
                            {
                                return (
                                    <label className="label-list" key = { item.id }>
                                        <input 
                                            type="checkbox"
                                            name="search_option"
                                            value = { item.value }
                                            checked = { genderValue == item.value }
                                            onChange = { (e) => {
                                                    setGender(item.value)
                                                }
                                            }
                                        />
                                        <span> { item.label } </span>
                                    </label>
                                )
                            }
                        )}
                    </div>
                : null}
            </div>
        </div>
    )
}