import styles from './EditBanner.module.scss'


interface EditBannerProps{
    image: File | null
    rules: string
    onChange: (image: File | null) => void
}

export function EditBanner({ image, rules, onChange }: EditBannerProps){
    return (
        <div className = {styles.editBanner}>
            <div className = { styles.editBanner__placeholder }>
                {
                    image ? (
                        <img src = { URL.createObjectURL(image) } alt = "Banner" />
                    ) : (
                        <div className = { styles.editBanner__placeholder__icon }>
                            Картинка не загружена
                        </div>
                    )
                }
            </div>
            <div className = { styles.editBanner__input }>
                <input type = "file"
                    accept = "image/*"
                    onChange = { (e) => onChange(e.target.files?.[0] as File || null) }
                />
            </div>
            <div className = { styles.editBanner__rules }>
                {rules}
            </div>
        </div>
    )
}