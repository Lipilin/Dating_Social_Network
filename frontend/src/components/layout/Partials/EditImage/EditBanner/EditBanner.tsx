import styles from './EditBanner.module.css'
import { EditImageBase } from '../EditImageBase/EditImageBase'
import type { EditImageProps } from '../types'

export function EditBanner(props: EditImageProps) {
    return (
        <EditImageBase
            {...props}
            className={styles.editBanner}
            placeholderClassName={styles.editBanner__placeholder}
            alt="Баннер"
        />
    )
}
