import { ModalCloseButton } from '@/components/ui/buttons/ModalCloseButton'

interface BaseModalProps {
    children: React.ReactNode
    title: string
}

export default function BaseModal({ children, title }: BaseModalProps) {
    return (
        <div className="modal show">
            <div className="modal__content">
                <div className="modal__head">
                    <h4>{title}</h4>
                    <ModalCloseButton />
                </div>
                <div className="modal__body">
                    {children}
                </div>
            </div>
        </div>
    )
}
