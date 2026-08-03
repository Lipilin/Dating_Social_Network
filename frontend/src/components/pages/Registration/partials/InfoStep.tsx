import type { UserPostRequest } from "@/utils/api/types"
import { StepChanger } from "./StepChanger"
import { DefaultInput } from "@/components/ui/inputs/DefaultInput"
import { GENDER } from "@/utils/api/types"

interface InfoStepProps {
    onSubmit: () => void
    onBack: () => void
    user: UserPostRequest
    setUserData: (value: UserPostRequest) => void
}

export function InfoStep(
    { 
        onSubmit, 
        onBack, 
        user, 
        setUserData,
    }: InfoStepProps) {
    return (
        <div className="thirdStep">
            <div className="modal__body-top">
                <h3>Обо мне</h3>
            </div>
            <div className="modal__body-form">
                <div className="inputs two">
                    <div className="input_item">
                        <DefaultInput 
                            value={ user.name }
                            setValue={ (value: string) => setUserData({ ...user, name: value }) }
                            label='Имя'
                            id='name_reg'
                        />
                    </div>
                    <div className="input_item">
                        <DefaultInput 
                            value={ user.surname }
                            setValue={ (value: string) => setUserData({ ...user, surname: value }) }
                            label='Фамилия'
                            id='secondName_reg'
                        />
                    </div>
                </div>
                <div className="inputs two">
                    <div className="input_item">
                        <DefaultInput 
                            value={ user.age }
                            setValue={ (value: number) => setUserData({ ...user, age: value }) }
                            label='Возраст'
                            id='age_reg'
                            type='number'
                        />
                    </div>
                    <div className="input_item">
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
                            <input type="radio" name="gender" value="male" />
                            <span>Мужской</span>
                        </label>
                        <label>
                            <input type="radio" name="gender" value="female" />
                            <span>Женский</span>
                        </label>
                    </div>
                </div>
                <textarea
                name="about"
                placeholder="Краткая информация" 
                value={ user.description }
                onChange = { (e) => setUserData({ ...user, description: e.target.value }) }
                />
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
