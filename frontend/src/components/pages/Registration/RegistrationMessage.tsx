import { ModalCloseButton } from '@/components/ui/buttons/ModalCloseButton'

interface RegistrationMessageProps{
    isOpen?: boolean
    onClose?: () => void
    body: string
    head: string
}

export function RegistrationMessage({isOpen = false, onClose, head, body}: RegistrationMessageProps) {
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose?.()
        }
    }

    return (
        <div className={`modal success${isOpen ? ' show' : ''}`} onClick={handleBackdropClick}>
            <div className="modal__content">
                <div className="modal__head">
                    <h4>{ head }</h4>
                    <ModalCloseButton onClick={onClose} />
                </div>
                <div className="modal__body">
                    <div className="modal__body-form">
                        <p> { body } </p>
                        <div className="row">
                            <button
                                type="button"
                                className="blue modal__close"
                                style={{ paddingLeft: 36, paddingRight: 36 }}
                                onClick={ onClose }
                            >
                                Закрыть
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}