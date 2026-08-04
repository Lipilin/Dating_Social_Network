import messageIcon from '@/assets/images/type_icon.png'

export function UserCommunicationActions(){
    return (
        <div className="head__profile-buttons">
            <a href="#" className="write">
                <img src={messageIcon} alt="" />
                <span>Написать</span>
            </a>
        </div>
    ) 
}