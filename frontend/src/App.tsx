import { useState } from 'react'
import { Routes, Route } from 'react-router'
import { ROUTES } from '@/config/General'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { Footer } from '@/components/layout/Footer'
import { AuthMain } from '@/components/pages/Auth/AuthMain'
import { 
    RegistrationMain, 
    RegistrationMessage
} from '@/components/pages/Registration'
import '@/assets/css/main.css'
import { ProfileProvider } from '@/utils/context/ProfileProvider'
import { StaticPage } from '@/components/pages/StaticPage/StaticPage'
import { CategoryProvider } from '@/utils/context/CategoryProvider'
import { ResetPasswordModal } from '@/components/layout/Modals'
import { User } from '@/utils/api/User'

const userApi = new User()

function App() {
    const [authOpen, setAuthOpen] = useState(false)
    const [resetPasswordOpen, setResetPasswordOpen] = useState(false)
    const [resetPasswordEmail, setResetPasswordEmail] = useState('')
    const [registrationOpen, setRegistrationOpen] = useState(false)
    const [registrationSuccessOpen, setRegistrationSuccessOpen] = useState(false)
    const [registrationErrorOpen, setRegistrationErrorOpen] = useState(false)
    const [registrationErrorMessage, setRegistrationErrorMessage] = useState('')
    const [sidebarActive, setSidebarActive] = useState(false)

    return (
        <div className="wrapper">
            <ProfileProvider
                onAuthModalOpen={() => setRegistrationOpen(true)}
                onLoginModalOpen={() => setAuthOpen(true)}
            >
                <CategoryProvider>
                    <Header
                        onOpenAuth={() => setAuthOpen(true)}
                        onOpenRegistration={() => setRegistrationOpen(true)}
                        onToggleSidebar={() => setSidebarActive((prev) => !prev)}
                    />
                    <div className="main__sections">
                        <Sidebar isActive={sidebarActive} />
                        <main className={`main${sidebarActive ? ' active' : ''}`}>
                                <Routes>
                                    {Object.values(ROUTES).map(({ URL, COMPONENT: Component, PROPS: Props }) => (
                                        <Route key={URL} path={URL} element={<Component />} />
                                    ))}
                                    <Route path="*" element={<StaticPage />} />
                                </Routes>
                            <Footer />
                        </main>
                    </div>
                    <AuthMain
                        isOpen={authOpen}
                        onClose={() => setAuthOpen(false)}
                        onSwitchToRegistration={() => {
                            setAuthOpen(false)
                            setRegistrationOpen(true)
                        }}
                        onForgotPassword={() => {
                            setAuthOpen(false)
                            setResetPasswordOpen(true)
                        }}
                    />
                    {resetPasswordOpen && (
                        <ResetPasswordModal
                            onInput={setResetPasswordEmail}
                            onClose={() => {
                                setResetPasswordOpen(false)
                                setResetPasswordEmail('')
                            }}
                            onSend={async () => {
                                await userApi.sendPasswordReset({ email: resetPasswordEmail })
                            }}
                        />
                    )}
                    <RegistrationMain
                        isOpen={registrationOpen}
                        onClose={() => setRegistrationOpen(false)}
                        onSwitchToAuth={() => {
                            setRegistrationOpen(false)
                            setAuthOpen(true)
                        }}
                        onSuccess={() => setRegistrationSuccessOpen(true)}
                        onError={(message) => {
                            setRegistrationErrorMessage(message)
                            setRegistrationErrorOpen(true)
                        }}
                    />
                    <RegistrationMessage
                        head='Регистрация успешна!'
                        body='На вашу электронную почту отправлено письмо с подтверждением! Подтвердите регистрацию!'
                        isOpen={registrationSuccessOpen}
                        onClose={() => setRegistrationSuccessOpen(false)}
                    />

                    <RegistrationMessage
                        head='Возникла ошибка при регистрации'
                        body='К сожалению, не удалось завершить регистрацию. Попробуйте позже или исправьте указанные данные.'
                        detailMessage={registrationErrorMessage}
                        isOpen={ registrationErrorOpen }
                        onClose={ () => {
                            setRegistrationErrorOpen(false)
                            setRegistrationErrorMessage('')
                        }}
                    />
                </CategoryProvider>
            </ProfileProvider>
        </div>
    )
}

export default App
