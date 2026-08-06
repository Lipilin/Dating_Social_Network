import { ROUTES } from '@/config/General'
import { Link } from 'react-router'
import { useContext } from 'react'
import { ProfileContext } from '@/utils/context/ProfileContext'

export function Banner() {
    const { openAuthModal } = useContext(ProfileContext)
    return (
        <section className="hero">
            <div className="container">
                <div className="row">
                    <div className="hero__card big">
                        <div className="hero__card-name">
                        Отдыхайте и общайтесь вместе
                        </div>
                        <button className="hero__card-btn" id="openAuth" onClick = { (e) => openAuthModal?.() }>Пройти регистрацию</button>
                    </div>
                    <div className="hero__card small">
                        <div className="hero__card-name">
                            Найти собеседника на карте
                        </div>
                        <Link to={ROUTES.DESTINATION.URL}>Поиск на карте</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
