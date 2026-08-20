import announcementIcon from '@/assets/images/create-announcement.svg'
import postIcon from '@/assets/images/create-post.svg'
import editIcon from '@/assets/images/edit-profile.svg'
import { ROUTES } from '@/config/General'
import { UserEditActionButton } from './UserEditActionButton'
import styles from './UserEditActions.module.css'

export function UserEditActions() {
    return (
        <div className={`profile__card-actions ${styles.actions}`}>
            <UserEditActionButton to={ROUTES.PROFILE_EDIT.URL}>
                <img src={editIcon} alt="" />
                Редактировать
            </UserEditActionButton>
            <UserEditActionButton
                iconOnly
                ariaLabel="Создать пост"
                to = {ROUTES.POST_CREATION.URL}
                onClick={() => {}}
            >
                <img src={postIcon} alt="" />
            </UserEditActionButton>
            <UserEditActionButton
                iconOnly
                ariaLabel="Создать объявление"
                to={ROUTES.ANNOUNCEMENT_CREATION.URL}
                onClick={() => {}}
            >
                <img src={announcementIcon} alt="" />
            </UserEditActionButton>
        </div>
    )
}
