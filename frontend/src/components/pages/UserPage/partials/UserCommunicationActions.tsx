import messageIcon from '@/assets/images/type_icon.png'
import { Link } from 'react-router'

export function UserCommunicationActions(){
    return (
        <div className="head__profile-buttons">
            <Link to="#" className="write">
                <img src={messageIcon} alt="" />
                <span>Написать</span>
            </Link>
        </div>
    ) 
}