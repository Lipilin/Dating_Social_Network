import type { UserResource } from "@/utils/api/types"

interface ProfileEditCountriesProps{
    profile: UserResource
    setUpdatedUser: (user: UserResource) => void
}

export function ProfileEditCountries({ profile, setUpdatedUser }: ProfileEditCountriesProps) {
    return (
        <>
            <h3 className="section__title">Страны</h3>
        </>
    )
}