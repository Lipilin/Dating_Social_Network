import { useState } from 'react'
import { BaseModal } from '../BaseModal'
import { useResetPasswordModal } from '@/hooks/modals/useResetPasswordModal'

interface ResetPasswordModalProps {
    onInput: (email: string) => void
    onClose: () => void
    onSend: () => Promise<void>
}

export default function ResetPasswordModal({ onInput, onClose, onSend }: ResetPasswordModalProps) {
    const [email, setEmail] = useState('')

    const handleInput = (value: string) => {
        setEmail(value)
        onInput(value)
    }

    const { title, content } = useResetPasswordModal({
        email,
        onInput: handleInput,
        onClose,
        onSend,
    })

    return (
        <BaseModal title={title} content={content} onClose={onClose} />
    )
}
