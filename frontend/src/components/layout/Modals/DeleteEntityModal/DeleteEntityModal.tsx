import { BaseModal } from '../BaseModal'
import { useDeleteModal } from '@/hooks/modals/useDeleteModal'

interface DeleteEntityModalProps {
    onDelete: () => Promise<void>
    onClose: () => void
}

export default function DeleteEntityModal({ onDelete, onClose }: DeleteEntityModalProps) {
    const { title, content } = useDeleteModal({ onDelete, onClose })

    return (
        <BaseModal title={title} content={content} onClose={onClose} />
    )
}
