import styles from './EditIcon.module.css'
import { EditImageBase } from '../EditImageBase/EditImageBase'
import type { EditImageBaseProps } from '../types'

type EditIconProps = Omit<EditImageBaseProps, 'alt'>

export function EditIcon({ className, placeholderClassName, ...props }: EditIconProps) {
    return (
        <EditImageBase
            {...props}
            className={[styles.editIcon, className].filter(Boolean).join(' ')}
            placeholderClassName={[styles.editIcon__placeholder, placeholderClassName].filter(Boolean).join(' ')}
            alt="Иконка объявления"
        />
    )
}
