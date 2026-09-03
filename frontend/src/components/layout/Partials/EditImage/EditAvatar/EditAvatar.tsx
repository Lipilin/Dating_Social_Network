import styles from './EditAvatar.module.css'
import { EditImageBase } from '../EditImageBase/EditImageBase'
import type { EditImageProps } from '../types'

export function EditAvatar(props: EditImageProps) {
    return (
        <EditImageBase
            {...props}
            className={styles.editAvatar}
            placeholderClassName={styles.editAvatar__placeholder}
            alt="Аватар"
        />
    )
}
