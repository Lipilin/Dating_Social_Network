import { StepChanger } from "./StepChanger"
import { DefaultInput } from "@/components/ui/inputs/DefaultInput"

interface InfoStepProps {
    onSubmit: () => void
    onBack: () => void
    name: string
    setName: (value: string) => void
    secondName: string
    setSecondName: (value: string) => void
    date: string
    setDate: (value: string) => void
    city: string
    setCity: (value: string) => void
}

export function InfoStep(
    { 
        onSubmit, 
        onBack, 
        name, 
        setName,
        secondName,
        setSecondName,
        date,
        setDate,
        city,
        setCity 
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
                            value={ name }
                            setValue={ setName }
                            label='Имя'
                            id='name_reg'
                        />
                    </div>
                    <div className="input_item">
                        <DefaultInput 
                            value={ secondName }
                            setValue={ setSecondName }
                            label='Фамилия'
                            id='secondName_reg'
                        />
                    </div>
                </div>
                <div className="inputs two">
                    <div className="input_item">
                        <DefaultInput 
                            value={ date }
                            setValue={ setDate }
                            label='Дата рождения'
                            id='date_reg'
                        />
                    </div>
                    <div className="input_item">
                        <DefaultInput 
                            value={ city }
                            setValue={ setCity }
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
                <textarea name="about" placeholder="Краткая информация" />
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
