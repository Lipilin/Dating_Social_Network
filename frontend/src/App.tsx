import { MainPage } from '@/components/pages/MainPage'
import { Routes, Route } from 'react-router'

function App() {
    return (
        <Routes>
            <Route path='/' element = { <MainPage />}/>
            <Route path='/instruction' element = {<></>} />
            <Route path='/announcements' element = {<></>} />
            <Route path='/destinations' element = {<></>} />
            <Route path='/interests' element = {<></>} />
        </Routes>
    )
}

export default App
