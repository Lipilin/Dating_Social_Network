import { useState } from 'react'
import { Routes, Route } from 'react-router'
import { ROUTES } from '@/config/General'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { Footer } from '@/components/layout/Footer'
import { AuthMain } from '@/components/pages/Auth/AuthMain'
import { RegistrationMain } from '@/components/pages/Registration/RegistrationMain'
import { RegistrationSuccess } from '@/components/pages/Registration/RegistrationSuccess'
import '@/assets/css/main.css'

function App() {
    const [authOpen, setAuthOpen] = useState(false)
    const [registrationOpen, setRegistrationOpen] = useState(false)
    const [registrationSuccessOpen, setRegistrationSuccessOpen] = useState(false)
    const [sidebarActive, setSidebarActive] = useState(false)

    return (
        <div className="wrapper">
            <Header
                onOpenAuth={() => setAuthOpen(true)}
                onOpenRegistration={() => setRegistrationOpen(true)}
                onToggleSidebar={() => setSidebarActive((prev) => !prev)}
            />
            <div className="main__sections">
                <Sidebar isActive={sidebarActive} />
                <main className={`main${sidebarActive ? ' active' : ''}`}>
                    <Routes>
                        {Object.values(ROUTES).map(({ URL, COMPONENT: Component }) => (
                            <Route key={URL} path={URL} element={<Component />} />
                        ))}
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
            />
            <RegistrationMain
                isOpen={registrationOpen}
                onClose={() => setRegistrationOpen(false)}
                onSwitchToAuth={() => {
                    setRegistrationOpen(false)
                    setAuthOpen(true)
                }}
                onSuccess={() => setRegistrationSuccessOpen(true)}
            />
            <RegistrationSuccess
                isOpen={registrationSuccessOpen}
                onClose={() => setRegistrationSuccessOpen(false)}
            />
        </div>
    )
}

export default App
