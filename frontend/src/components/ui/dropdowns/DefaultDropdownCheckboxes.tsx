import type { Label } from './DefaultDropdown'
import type { DefaultDropdownProps } from './DefaultDropdown'


export function DefaultDropdownCheckboxes<T>({ value, setValue, labels }: DefaultDropdownProps<T>){
    return (
        <>
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
        </>
    )
}