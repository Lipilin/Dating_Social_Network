import messageIcon from '@/assets/images/type_icon.svg'
import { ROUTES } from '@/config/General'
import { Link } from 'react-router'

export function UserEditActions() {
    return (
        <div className="profile__card-actions">
            <Link to={ROUTES.PROFILE_EDIT.URL} className="write">
                <img src={messageIcon} alt="" />
                Редактировать
            </Link>
        </div>
    )
}
