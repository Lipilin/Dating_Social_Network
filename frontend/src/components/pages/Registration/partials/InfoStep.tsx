import type { UserPostRequest } from "@/utils/api/types"
import { StepChanger } from "./StepChanger"
import { DefaultInput } from "@/components/ui/inputs/DefaultInput"
import { GENDER } from "@/utils/api/types"
import {
    errorListClasses,
    inputErrorClasses,
    textareaErrorClasses,
} from "@/styles/formErrors"

const infoStepFields = ['name', 'surname', 'age', 'city', 'description'] as const

interface InfoStepProps {
    onSubmit: () => void
    onBack: () => void
    user: UserPostRequest
    setUserData: (value: UserPostRequest) => void
    errors: Record<string, string>
}

export function InfoStep(
    { 
        onSubmit, 
        onBack, 
        user, 
        setUserData,
        errors,
    }: InfoStepProps) {
    const errorMessages = infoStepFields.filter((field) => errors[field])

    return (
        <div className="thirdStep">
            <div className="modal__body-top">
                <h3>Обо мне</h3>
            </div>
            <div className="modal__body-form">
                <div className="inputs two">
                    <div className={`input_item ${errors.name ? inputErrorClasses : ''}`}>
                        <DefaultInput 
                            value={ user.name }
                            setValue={ (value: string) => setUserData({ ...user, name: value }) }
                            label='Имя'
                            id='name_reg'
                        />
                    </div>
                    <div className={`input_item ${errors.surname ? inputErrorClasses : ''}`}>
                        <DefaultInput 
                            value={ user.surname }
                            setValue={ (value: string) => setUserData({ ...user, surname: value }) }
                            label='Фамилия'
                            id='secondName_reg'
                        />
                    </div>
                </div>
                <div className="inputs two">
                    <div className={`input_item ${errors.age ? inputErrorClasses : ''}`}>
                        <DefaultInput 
                            value={ user.age }
                            setValue={ (value: number) => setUserData({ ...user, age: Number(value) }) }
                            label='Возраст'
                            id='age_reg'
                            type='number'
                        />  
                    </div>
                    <div className={`input_item ${errors.city ? inputErrorClasses : ''}`}>
                        <DefaultInput 
                            value={ user.city }
                            setValue={ (value: string) => setUserData({ ...user, city: value }) }
                            label='Родной город'
                            id='language_city_reg'
                        />
                    </div>
                </div>
                <div className="inputs">
                    <h4>Пол:</h4>
                    <div className="input_radio">
                        <label>
                            <input
                            checked={ user.gender === GENDER.MALE }
                            type="radio"
                            name="gender"
                            value= { GENDER.MALE } 
                            onChange={ 
                                (e) => setUserData({ ...user, gender: e.target.value as GENDER }) 
                            }/>
                            <span>Мужской</span>
                        </label>
                        <label>
                            <input
                            checked={ user.gender === GENDER.FEMALE }
                            type="radio"
                            name="gender"
                            value= { GENDER.FEMALE } 
                            onChange={ 
                                (e) => setUserData({ ...user, gender: e.target.value as GENDER }) 
                            }/>
                            <span>Женский</span>
                        </label>
                    </div>
                </div>
                <textarea
                    className={errors.description ? textareaErrorClasses : undefined}
                    name="about"
                    placeholder="Краткая информация" 
                    value={ user.description }
                    onChange = { (e) => setUserData({ ...user, description: e.target.value }) }
                />
                {errorMessages.length > 0 && (
                    <div className={errorListClasses} role="alert">
                        {errorMessages.map((field) => (
                            <span key={field} className="block">
                                {errors[field]}
                            </span>
                        ))}
                    </div>
                )}
                <div className="row buttons">
                    <button type="button" className="blue" onClick={onSubmit}>
                        Регистрация
                    </button>
                    <StepChanger direction="previous" onChange={onBack} />  
                </div>
            </div>
        </div>
    )
}
