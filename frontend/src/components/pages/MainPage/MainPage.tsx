import '@/assets/css/main.css'
import {
    SearchForm,
    InterestBlock,
    DestinationBlock,
    AnnouncementSlider,
    Banner
} from './index'
import { Announcement } from '@/utils/api/Announcement'
import { User } from '@/utils/api/User'

const announcement = new Announcement()
const user = new User()

export function MainPage() {
    return (
        <div className='wrapper'>
            <div className='main__sections'>
                <main className='main'>
                    <Banner />
                    <SearchForm />
                    <AnnouncementSlider dataProvider={ announcement }/>
                    <section className="friends">
                        <div className="container">
                            <div className="row">
                                <InterestBlock />
                                <DestinationBlock />
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}