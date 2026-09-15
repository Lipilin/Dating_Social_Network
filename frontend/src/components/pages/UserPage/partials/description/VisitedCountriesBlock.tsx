import type { InterestResource } from '@/utils/api/types'
import { useContext } from 'react'
import { Link } from 'react-router'
import { useNavigate } from 'react-router'
import { ROUTES } from '@/config/General'
import { ProfileContext } from '@/utils/context/ProfileContext'
import { ProfileSectionEmpty } from '../ProfileSectionEmpty'

interface VisitedCountriesBlockProps {
    interests: InterestResource[]
    userId: number
}

export function VisitedCountriesBlock({ interests, userId }: VisitedCountriesBlockProps) {
    const { user: currentUser } = useContext(ProfileContext)
    const navigate = useNavigate()
    const isOwnProfile = currentUser?.id === userId

    return (
        <div className="friends__directions">
            <h3>Я посещал</h3>
            <div className="countries">
                {interests.length === 0 ? (
                    <ProfileSectionEmpty
                        compact
                        title="Пока нет посещённых стран"
                        buttonText={isOwnProfile ? 'Добавить страны' : undefined}
                        onAction={isOwnProfile ? () => navigate(ROUTES.PROFILE_EDIT.URL) : undefined}
                    />
                ) : (
                    interests.map((country) => (
                        <Link key={country.id} to="#" className="country__item">
                            {country.image && <img src={country.image} alt="" />}
                            {country.name}
                        </Link>
                    ))
                )}
            </div>
        </div>
    )
}
