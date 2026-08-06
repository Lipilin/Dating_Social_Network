import { ProfileContext } from "@/utils/context/ProfileContext"
import { useContext } from "react"

export function NeedRegistration() {
    const { openAuthModal } = useContext(ProfileContext)
    return (
        <section className="need-registration">
            <div className="container">
                <div className="need-registration__card">
                    <div className="need-registration__icon" aria-hidden="true">
                        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M16 15C18.7614 15 21 12.7614 21 10C21 7.23858 18.7614 5 16 5C13.2386 5 11 7.23858 11 10C11 12.7614 13.2386 15 16 15Z"
                                stroke="#0041F2"
                                strokeWidth="2"
                            />
                            <path
                                d="M8 26V24C8 20.6863 10.6863 18 14 18H18C21.3137 18 24 20.6863 24 24V26"
                                stroke="#0041F2"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                            <path
                                d="M22 10H26M24 8V12"
                                stroke="#0041F2"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>
                    <h1>Необходима регистрация</h1>
                    <p className="need-registration__text">
                        Чтобы просматривать эту страницу, создайте аккаунт на платформе
                    </p>
                    <button
                        type="button"
                        className="need-registration__button"
                        onClick={ (e) => openAuthModal?.() }
                    >
                        Зарегистрироваться
                    </button>
                </div>
            </div>
        </section>
    )
}
