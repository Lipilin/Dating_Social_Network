import styles from './DefaultPagination.module.css'

interface DefaultPaginationProps{
    prevPageBlock: boolean 
    nextPageBlock: boolean
    onPrevPage: () => void
    onNexPage: () => void 
    paginationNumber: number
}


export function DefaultPagination(
    { 
        prevPageBlock, 
        nextPageBlock, 
        onPrevPage, 
        onNexPage, 
        paginationNumber
    }: DefaultPaginationProps) {
        const prevPageButtonClass = prevPageBlock ? "need-registration__button_gray" : "need-registration__button"
        const nextPageButtonClass = nextPageBlock ? "need-registration__button_gray" : "need-registration__button"
        return(
            <div className = { styles.paginationContainer }>
                <div className = { styles.pagination }>
                    <button 
                        className = { styles.buttonPagination + ' ' + prevPageButtonClass }
                        disabled = { prevPageBlock } 
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
                        disabled = { nextPageBlock } 
                        onClick = { (e) => onNexPage() }>
                            Далее
                    </button>
                </div>
            </div>
        )
}