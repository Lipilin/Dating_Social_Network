import { GENDER_PREFERENCE } from '@/utils/api/types'
import { genderLabels } from '@/config/genderLabels'
import avatarFemale from '@/assets/images/avatar_female.svg'
import avatarMale from '@/assets/images/avatar_male.svg'
import avatarAnybody from '@/assets/images/avatar_group.svg'
import styles from './GenderPreferenceSelector.module.css'

interface GenderPreferenceSelectorProps {
    value: GENDER_PREFERENCE
    onChange: (value: GENDER_PREFERENCE) => void
    label?: string
}

const genderOptions = [
    GENDER_PREFERENCE.ANYBODY,
    GENDER_PREFERENCE.FEMALE,
    GENDER_PREFERENCE.MALE,
] as const

const genderAvatarSrc: Record<GENDER_PREFERENCE, string> = {
    [GENDER_PREFERENCE.FEMALE]: avatarFemale,
    [GENDER_PREFERENCE.MALE]: avatarMale,
    [GENDER_PREFERENCE.ANYBODY]: avatarAnybody,
}

const genderModifier: Record<GENDER_PREFERENCE, string> = {
    [GENDER_PREFERENCE.FEMALE]: styles.female,
    [GENDER_PREFERENCE.MALE]: styles.male,
    [GENDER_PREFERENCE.ANYBODY]: styles.anybody,
}

export function GenderPreferenceSelector({
    value,
    onChange,
    label = 'Я ищу',
}: GenderPreferenceSelectorProps) {
    return (
        <div className={styles.wrapper}>
            <span className={styles.label}>{label}</span>
            <div className={styles.options} role="radiogroup" aria-label={label}>
                {genderOptions.map((option) => (
                    <label
                        key={option}
                        className={`${styles.option} ${genderModifier[option]} ${value === option ? styles.active : ''}`}
                    >
                        <input
                            type="radio"
                            name="gender-preference"
                            value={option}
                            checked={value === option}
                            onChange={() => onChange(option)}
                        />
                        <span className={styles.icon}>
                            <img src={genderAvatarSrc[option]} alt="" width={15} height={15} />
                        </span>
                        <span className={styles.text}>{genderLabels[option].label}</span>
                    </label>
                ))}
            </div>
        </div>
    )
}
