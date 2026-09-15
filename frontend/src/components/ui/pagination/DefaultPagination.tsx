import styles from './DefaultPagination.module.css'

interface DefaultPaginationProps{
    prevPageDisabled: boolean 
    nextPageDisabled: boolean
    onPrevPage: () => void
    onNextPage: () => void 
    paginationNumber: number
}


export function DefaultPagination(
    { 
        prevPageDisabled, 
        nextPageDisabled, 
        onPrevPage, 
        onNextPage, 
        paginationNumber
    }: DefaultPaginationProps) {
        const prevPageButtonClass = prevPageDisabled ? "need-registration__button_gray" : "need-registration__button"
        const nextPageButtonClass = nextPageDisabled ? "need-registration__button_gray" : "need-registration__button"
        return(
            <div className = { styles.paginationContainer }>
                <div className = { styles.pagination }>
                    <button 
                        className = { styles.buttonPagination + ' ' + prevPageButtonClass }
                        disabled = { prevPageDisabled } 
                        onClick = { (e) => onPrevPage() }>
                            Назад
                    </button>
                    <div className={ styles.paginationNumber }>
                        <svg
                            className={ styles.paginationNumberCircle }
                            viewBox="0 0 40 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                        >
                            <circle cx="20" cy="20" r="20" fill="#0041F2" />
                        </svg>
                        <span className={ styles.paginationNumberText }>{ paginationNumber }</span>
                    </div>
                    <button 
                        className = { styles.buttonPagination + ' ' + nextPageButtonClass }
                        disabled = { nextPageDisabled } 
                        onClick = { (e) => onNextPage() }>
                            Далее
                    </button>
                </div>
            </div>
        )
}