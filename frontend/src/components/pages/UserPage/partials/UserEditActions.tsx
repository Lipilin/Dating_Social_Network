import messageIcon from '@/assets/images/type_icon.png'

export function UserEditActions(){
    return (
        <div className="head__profile-buttons">
            <a href="#" className="write">
                <img src={ messageIcon } alt="" />
                <span>Редактировать</span>
            </a>
        </div>
    ) 
}