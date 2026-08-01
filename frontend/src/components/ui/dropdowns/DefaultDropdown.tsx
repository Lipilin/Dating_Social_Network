import { useState, useCallback, useMemo } from 'react'
import selectArrowSvg from '@/assets/images/select_arrow.svg'

export interface Label<T> {
    id: string | number, 
    label: string, 
    value: T
}

export interface DefaultDropdownProps<T> {
    value: T | null, 
    setValue: (value: T) => void, 
    labels: Label<T>[], 
    placeholder: string,
}

export function DefaultDropdown<T>({ value, setValue, labels, placeholder }: DefaultDropdownProps<T>){
    const [open, setOpen] = useState(false)
    const changeHandler = useCallback((e: React.FocusEvent<HTMLDivElement>) => {
        setOpen(e.currentTarget.contains(e.relatedTarget))
    }, [])
    const activeLabel = useMemo(() => {
        return labels.find((item) => item.value == value)?.label
    }, [value, labels])
    return (
        <div className="search__top-item">
            <div 
                className="input-data"
                onFocus={ () => setOpen(true) }
                onBlur={ changeHandler }
            >
                <input 
                    type="text"
                    required={ true }
                    id="selected-values" 
                    value = { activeLabel ? activeLabel : ''}
                    onChange = {() => null}
                    placeholder=" "
                />
                <label className="label" > { placeholder } </label>
                <img src={ selectArrowSvg } alt="" className="arrow-toogle" />
                { open ? 
                    <div id="checkbox-list" className="checkbox-list visible bottom" onMouseDown = { (e) => {e.preventDefault()} }>
                        {labels.map((item) => 
                            {
                                return (
                                    <label className="label-list" key = { item.id }>
                                        <input 
                                            type="checkbox"
                                            name="search_option"
                                            checked = { value == item.value }
                                            onChange = { () => {
                                                    setValue(item.value)
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