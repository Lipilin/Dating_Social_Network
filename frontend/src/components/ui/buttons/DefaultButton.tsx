interface defaultButtonProps{
    classNames: string, 
    onSend: () => Promise<void>, 
    content: string
}

export function DefaultButton({classNames, onSend, content}: defaultButtonProps){
    return (
        <button className={classNames} onClick={(e) => {
            e.preventDefault()
            onSend()
        }}>{content}</button>
    )
}