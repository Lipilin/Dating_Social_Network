import { GENDER_PREFERENCE } from '@/utils/api/types'
import { default as avatar_female } from '@/assets/images/avatar_female.svg'
import { default as avatar_male } from '@/assets/images/avatar_male.svg'
import { default as avatar_anybody } from '@/assets/images/avatar_group.svg'
import { genderLabels } from '@/config/General'

interface AnnouncementGenderBLockProps {
    gender: GENDER_PREFERENCE
}

const genderAvatarClass: Record<GENDER_PREFERENCE, string> = {
    [GENDER_PREFERENCE.FEMALE]: 'j',
    [GENDER_PREFERENCE.MALE]: 'm',
    [GENDER_PREFERENCE.ANYBODY]: 'k',
}

const genderAvatarSrc: Record<GENDER_PREFERENCE, string> = {
    [GENDER_PREFERENCE.FEMALE]: avatar_female,
    [GENDER_PREFERENCE.MALE]: avatar_male,
    [GENDER_PREFERENCE.ANYBODY]: avatar_anybody,
}

export function AnnouncementGenderBLock({ gender }: AnnouncementGenderBLockProps) {
    return (
        <div className="profile-badge">
            <div className="avatars">
                <div className={`avatar ${genderAvatarClass[gender]}`}>
                    <img src={genderAvatarSrc[gender]} alt="" width={15} height={15} />
                </div>
            </div>
            <div className="text">{genderLabels[gender].label}</div>
        </div>
    )
}
