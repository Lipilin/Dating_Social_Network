import type { UserResource } from '@/utils/api/types'
import { AboutMeBlock } from './description/AboutMeBlock'
import { InterestsBlock } from './description/InterestsBlock'
import { MapBlock } from './description/MapBlock'
import { VisitedCountriesBlock } from './description/VisitedCountriesBlock'

export function DescriptionBlock({ user }: { user: UserResource }) {
    return (
        <div className="about">
            <div className="about__block">
                <div className="about__block-left">
                    <AboutMeBlock user={user} />
                    <InterestsBlock interests = { user.interests || []}/>
                </div>
                <div className="about__block-right">
                    <MapBlock />
                    <VisitedCountriesBlock interests = { user.interests?.filter((interest) => interest.category?.isCountry) || []}/>
                </div>
            </div>
        </div>
    )
}
