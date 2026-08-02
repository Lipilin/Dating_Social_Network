import { ModalCloseButton } from '@/components/ui/buttons/ModalCloseButton'

interface RegistrationSuccessProps {
    isOpen?: boolean
    onClose?: () => void
}

export function RegistrationSuccess({ isOpen = false, onClose }: RegistrationSuccessProps) {
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose?.()
        }
    }

    return (
        <div className={`modal success${isOpen ? ' show' : ''}`} onClick={handleBackdropClick}>
            <div className="modal__content">
                <div className="modal__head">
                    <h4>Регистрация успешна!</h4>
                    <ModalCloseButton onClick={onClose} />
                </div>
                <div className="modal__body">
                    <div className="modal__body-form">
                        <p>На вашу электронную почту mail@mail.ru отправлено письмо с подтверждением.</p>
                        <div className="row">
                            <button
                                type="button"
                                className="blue modal__close"
                                style={{ paddingLeft: 36, paddingRight: 36 }}
                                onClick={onClose}
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
