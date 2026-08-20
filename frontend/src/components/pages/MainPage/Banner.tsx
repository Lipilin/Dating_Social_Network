import { ROUTES } from '@/config/General'
import { Link } from 'react-router'
import { useContext } from 'react'
import { ProfileContext } from '@/utils/context/ProfileContext'
import { useNavigate } from 'react-router'


export function Banner() {
    const { openAuthModal, user } = useContext(ProfileContext)
    const navigate = useNavigate()
    return (
        <section className="hero">
            <div className="container">
                <div className="row">
                    <div className="hero__card big">
                        
                        <div className="hero__card-name">
                            Отдыхайте и общайтесь вместе
                        </div>
                        <button 
                            className="hero__card-btn"
                            id="openAuth"
                            onClick = { (e) => {
                                user == null ? openAuthModal?.() : navigate(ROUTES.ANNOUNCEMENT_CREATION.URL)
                            }} 
                        >
                            {
                                user == null ? 'Пройти регистрацию' : 'Создать объявление'
                            }
                        </button>
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
