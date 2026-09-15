import { GENDER_PREFERENCE } from '@/utils/api/types'
import { genderLabels } from '@/config/General'
import { DefaultDropdown } from '@/components/ui/dropdowns/DefaultDropdown'

interface SearchGenderProps{
    genderValue: GENDER_PREFERENCE | null, 
    setGender: (value: GENDER_PREFERENCE) => void
}

export function SearchGender({ genderValue, setGender }: SearchGenderProps){
    return (
        <DefaultDropdown
            value={genderValue}
            setValue = {setGender}
            labels = {Object.values(genderLabels)}
            placeholder="Я ищу"
        />
    )
}