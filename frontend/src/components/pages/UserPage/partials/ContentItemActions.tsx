import editPencilIcon from '@/assets/images/edit-pencil.svg'
import deleteTrashIcon from '@/assets/images/delete-trash.svg'
import styles from './ContentItemActions.module.css'

interface ContentItemActionsProps {
    onEdit?: () => void
    onDelete?: () => void
}

export function ContentItemActions({ onEdit, onDelete }: ContentItemActionsProps) {
    return (
        <div className={styles.actions}>
            <button
                type="button"
                className={styles.button}
                aria-label="Редактировать"
                onClick={onEdit}
            >
                <img src={editPencilIcon} alt="" />
            </button>
            <button
                type="button"
                className={styles.button}
                aria-label="Удалить"
                onClick={onDelete}
            >
                <img src={deleteTrashIcon} alt="" />
            </button>
        </div>
    )
}

export { styles as contentItemActionsStyles }
