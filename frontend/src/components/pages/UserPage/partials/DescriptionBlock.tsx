import type { UserResource } from '@/utils/api/types'
import { AboutMeBlock } from './description/AboutMeBlock'
import { InterestsBlock } from './description/InterestsBlock'
import { VisitedCountriesBlock } from './description/VisitedCountriesBlock'

export function DescriptionBlock({ user }: { user: UserResource }) {
    const visitedCountries = user.interests?.filter((interest) => interest.category?.isCountry) || []
    const personalInterests = user.interests?.filter((interest) => !interest.category?.isCountry) || []

    return (
        <div className="about__block">
            <div className="about__block-left">
                <AboutMeBlock user={user} />
                <InterestsBlock interests={personalInterests} userId={user.id} />
            </div>
            <div className="about__block-right">
                <VisitedCountriesBlock interests={visitedCountries} userId={user.id} />
            </div>
        </div>
    )
}
