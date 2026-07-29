import { GENDER_PREFERENCE } from "@/utils/api/types"
import { default as avatar_female } from "@/assets/images/avatar_female.svg"
import { default as avatar_male } from "@/assets/images/avatar_male.svg"
import { default as avatar_anybody } from "@/assets/images/avatar_group.svg"
import { genderLabels } from "@/config/General"

interface AnnouncementGenderBLockProps{
    gender: GENDER_PREFERENCE
}

export function AnnouncementGenderBLock({ gender }: AnnouncementGenderBLockProps){
    let content;
    switch(gender){
        case(GENDER_PREFERENCE.FEMALE):
            content =  (
                <div className="avatars">
                    <div className="avatar j">
                        <img src = { avatar_female } alt="" />
                    </div>
                </div>
            )
            break
        case(GENDER_PREFERENCE.MALE):
            content = (
                <div className="avatars">
                    <div className="avatar m">
                        <img src = { avatar_male } alt="" />
                    </div>
                </div>
            )
            break
        case(GENDER_PREFERENCE.ANYBODY):
            content = (
                <div className="avatars">
                    <div className="avatar k">
                        <img src = { avatar_anybody } alt="" />
                    </div>
                </div>
            )
            break
    }
    return (
        <div className="profile-badge">
            {
                <>
                    { content } 
                    <div className="text">{ genderLabels[gender].label }</div>      
                </>
            }
        </div>
    )
}