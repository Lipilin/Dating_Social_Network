interface defaultButtonProps{
    classNames: string, 
    onSend: () => Promise<void>, 
    content: string
    isLoading?: boolean
}

export function DefaultButton({ classNames, onSend, content, isLoading = false }: defaultButtonProps){
    return (
        <button
            className={classNames}
            disabled={isLoading}
            onClick={(e) => {
                e.preventDefault()
                if (!isLoading) onSend()
            }}
        >
            {isLoading ? 'Отправка...' : content}
        </button>
    )
}