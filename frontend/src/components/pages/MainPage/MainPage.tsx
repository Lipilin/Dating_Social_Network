import '@/assets/css/main.css'
import {
    SearchForm,
    InterestBlock,
    AnnouncementSlider,
    Banner
} from './index'
import { Announcement } from '@/utils/api/Announcement'
import { User } from '@/utils/api/User'
import { Category } from '@/utils/api/Category'

const announcement = new Announcement()
const user = new User()
const category = new Category()

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
                                <InterestBlock dataProvider={ category }/>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}