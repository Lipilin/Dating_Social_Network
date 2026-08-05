import { GENDER_PREFERENCE } from '@/utils/api/types'
import { genderLabels } from '@/config/General'
import avatarFemale from '@/assets/images/avatar_female.svg'
import avatarMale from '@/assets/images/avatar_male.svg'
import avatarAnybody from '@/assets/images/avatar_group.svg'
import styles from './GenderPreferenceBlock.module.css'

interface GenderPreferenceBlockProps {
    gender: GENDER_PREFERENCE
}

const genderModifier: Record<GENDER_PREFERENCE, string> = {
    [GENDER_PREFERENCE.FEMALE]: styles.female,
    [GENDER_PREFERENCE.MALE]: styles.male,
    [GENDER_PREFERENCE.ANYBODY]: styles.anybody,
}

const genderAvatarSrc: Record<GENDER_PREFERENCE, string> = {
    [GENDER_PREFERENCE.FEMALE]: avatarFemale,
    [GENDER_PREFERENCE.MALE]: avatarMale,
    [GENDER_PREFERENCE.ANYBODY]: avatarAnybody,
}

export function GenderPreferenceBlock({ gender }: GenderPreferenceBlockProps) {
    return (
        <div className={`${styles.badge} ${genderModifier[gender]}`}>
            <span className={styles.icon}>
                <img src={genderAvatarSrc[gender]} alt="" width={15} height={15} />
            </span>
            <span className={styles.label}>{genderLabels[gender].label}</span>
        </div>
    )
}
