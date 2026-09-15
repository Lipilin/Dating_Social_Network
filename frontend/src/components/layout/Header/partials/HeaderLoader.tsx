import styles from './HeaderLoader.module.css'

export function HeaderLoader() {
    return (
        <div className={`header__buttons ${styles.container}`} aria-label="Загрузка" role="status">
            <div className={styles.icon} aria-hidden="true">
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M16 4C22.6274 4 28 9.37258 28 16"
                        stroke="#0041F2"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                    <path
                        d="M28 16C28 22.6274 22.6274 28 16 28C9.37258 28 4 22.6274 4 16C4 9.37258 9.37258 4 16 4"
                        stroke="#0041F2"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeDasharray="4 5"
                        opacity="0.35"
                    />
                </svg>
            </div>
        </div>
    )
}
