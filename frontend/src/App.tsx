import { Routes, Route } from 'react-router'
import { ROUTES } from '@/config/General'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

function App() {
    return (
        <div className="wrapper">
            <Header />
            <div className="main__sections">
                <main className="main">
                    <Routes>
                        {Object.values(ROUTES).map(({ URL, COMPONENT: Component }) => (
                            <Route key={URL} path={URL} element={<Component />} />
                        ))}
                    </Routes>
                    <Footer />
                </main>
            </div>
        </div>
    )
}

export default App
