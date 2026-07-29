interface DefaultInputProps{
    label?: string,
    value: string, 
    setValue: (value: string) => void
}

export function DefaultInput({ label, value, setValue }: DefaultInputProps){
    return (
        <>
            <input type="text" placeholder=" " value = { value } onChange = { (e) => setValue(e.target.value) }/>
            <label className="label">
                { label }
            </label>
        </>
    )
}