import headBackground from '@/assets/images/head_bg.png'
import profileAvatar from '@/assets/images/profile_girl.png'
import friendsIcon from '@/assets/images/side_friends_icon.svg'
import messageIcon from '@/assets/images/type_icon.png'
import { ROUTES } from '@/config/General'

export function ProfilePage() {
    return (
        <section className="head">
            <div className="container">
                <div className="head__image">
                    <img src={headBackground} alt="" />
                </div>
                <div className="head__profile">
                    <div className="head__profile-infos">
                        <div className="head__profile-avatar">
                            <img src={profileAvatar} alt="" />
                            <span className="red">
                                9
                                <span className="info">Уровень пользователя</span>
                            </span>
                        </div>
                        <div>
                            <h4 className="head__profile-name">Вика Балабанова</h4>
                            <div className="time">была в сети 10 часов назад</div>
                        </div>
                    </div>
                    <div className="head__profile-buttons">
                        <a href="#" className="add">
                            <img src={friendsIcon} alt="" />
                            <span>Добавить в друзья</span>
                        </a>
                        <a href="#" className="write">
                            <img src={messageIcon} alt="" />
                            <span>Написать</span>
                        </a>
                    </div>
                </div>
                <div className="profile__menu">
                    <ul>
                        <li><a className="active" href={ROUTES.PROFILE.URL}>О себе</a></li>
                        <li><a href="#">Посты (25)</a></li>
                        <li><a href={ROUTES.ANNOUNCEMENT.URL}>Объявления (2)</a></li>
                        <li><a href="#">Фото (5)</a></li>
                        <li><a href="#">Подписчики (5)</a></li>
                    </ul>
                </div>
            </div>
        </section>
    )
}
