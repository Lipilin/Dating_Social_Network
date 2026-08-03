interface DefaultInputProps<T extends string | number = string>{
    label?: string
    value: T
    setValue: (value: T) => void
    type?: 'text' | 'email' | 'password' | 'number'
    id?: string
}

export function DefaultInput<T extends string | number>(
    {
        label, 
        value, 
        setValue, 
        id = 'default-input', 
        type = 'text' 
    }: DefaultInputProps<T>){
    return (
        <>
            <input 
                type = { type } 
                placeholder = " " 
                value = { value } 
                onChange = { (e) => setValue(e.target.value as T) }
                id = { id }
            />
            <label className="label" htmlFor = { id }  >
                { label }
            </label>
        </>
    )
}