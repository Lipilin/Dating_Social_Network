import messageIcon from '@/assets/images/type_icon.svg'
import { Link } from 'react-router'

export function UserCommunicationActions() {
    return (
        <div className="profile__card-actions">
            <Link to="#" className="write">
                <img src={messageIcon} alt="" />
                Написать
            </Link>
        </div>
    )
}
