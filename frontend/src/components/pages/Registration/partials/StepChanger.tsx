interface StepChangerProps{
    direction: 'next' | 'previous'
    onChange: () => void
}


export function StepChanger({ direction, onChange }: StepChangerProps){
    switch(direction){
        case 'next':
            return (
                <>
                    <button type="button" className="blue" onClick={ onChange }>
                        Дальше
                        <svg xmlns="http://www.w3.org/2000/svg" width="9" height="15" viewBox="0 0 9 15" fill="none">
                            <path d="M1 14L7.5 7.5L1 1" stroke="white" strokeWidth="2" />
                        </svg>
                    </button>
                </>
            )
        case 'previous':
            return (
                <>
                    <button type="button" className="back" onClick={ onChange }>
                        Назад
                    </button>
                </>
            )
    }
}