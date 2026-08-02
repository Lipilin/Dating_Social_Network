interface DefaultInputProps{
    label?: string
    value: string
    setValue: (value: string) => void
    type?: 'text' | 'email' | 'password'
    id?: string
}

export function DefaultInput({ label, value, setValue, id = 'default-input', type = 'text' }: DefaultInputProps){
    return (
        <>
            <input 
                type = { type } 
                placeholder = " " 
                value = { value } 
                onChange = { (e) => setValue(e.target.value) }
                id = { id }
            />
            <label className="label" htmlFor = { id }  >
                { label }
            </label>
        </>
    )
}