import type { UserResource } from '@/utils/api/types'

export function AboutMeBlock({user}: {user: UserResource}) {
    return (
        <div className="about__content">
            <div className="about__content-top">
                <h3>Обо мне</h3>
            </div>
            <div className="about__details">
                <div className="about__details-item">
                    <div className="question">Возраст</div>
                    <span className="dark">{user.age} год</span>
                </div>
                <div className="about__details-item">
                    <div className="question">Дата регистрации</div>
                    <span className="dark">{new Date(user.createdAt).toLocaleDateString('ru-RU')}</span>
                </div>
            </div>
            <p className="about__text">
                { user.description }
            </p>
        </div>
    )
}
