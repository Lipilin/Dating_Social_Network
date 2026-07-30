import { Routes, Route } from 'react-router'
import { MainPage } from '@/components/pages/MainPage'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

function App() {
    return (
        <div className="wrapper">
            <Header />
            <div className="main__sections">
                <main className="main">
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/instruction" element={<></>} />
                        <Route path="/announcements" element={<></>} />
                        <Route path="/destinations" element={<></>} />
                        <Route path="/interests" element={<></>} />
                    </Routes>
                    <Footer />
                </main>
            </div>
        </div>
    )
}

export default App
