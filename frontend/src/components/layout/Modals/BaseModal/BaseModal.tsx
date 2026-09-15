import { useCallback, useRef, type MouseEvent, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { ModalCloseButton } from '@/components/ui/buttons/ModalCloseButton'
import { MODAL_ANIMATION_MS } from '@/config/uiSettings'
import styles from './BaseModal.module.css'

interface BaseModalProps {
    title: string
    content: ReactNode
    onClose: () => void
}

export default function BaseModal({ title, content, onClose }: BaseModalProps) {
    const overlayNodeRef = useRef<HTMLDivElement | null>(null)
    const isClosingRef = useRef(false)

    const handleClose = useCallback(() => {
        if (isClosingRef.current) return
        isClosingRef.current = true
        overlayNodeRef.current?.classList.remove('show')
        window.setTimeout(onClose, MODAL_ANIMATION_MS)
    }, [onClose])

    const overlayRef = useCallback((node: HTMLDivElement | null) => {
        overlayNodeRef.current = node
        if (node) {
            requestAnimationFrame(() => node.classList.add('show'))
        }
    }, [])

    const handleBackdropClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            handleClose()
        }
    }, [handleClose])

    return createPortal(
        (
            <div
                ref={overlayRef}
                className={`modal success ${styles.overlay}`}
                onClick={handleBackdropClick}
            >
                <div className="modal__content">
                    <div className="modal__head">
                        <h4>{title}</h4>
                        <ModalCloseButton onClick={handleClose} />
                    </div>
                    <div className="modal__body">
                        <div className="modal__body-form">
                            {content}
                        </div>
                    </div>
                </div>
            </div>
        ),
        document.body,
    )
}
