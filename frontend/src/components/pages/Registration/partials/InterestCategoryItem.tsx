import type { CategoryWithInterestResource, UserPostRequest } from '@/utils/api/types'
import { useState } from 'react'


interface InterestCategoryItemProps {
    category: CategoryWithInterestResource
    user: UserPostRequest
    setUserData: (user: UserPostRequest) => void
}

export function InterestCategoryItem({ category, user, setUserData }: InterestCategoryItemProps) {
    const [open, setOpen] = useState(false)

    return (
        <div className="interest__item">
            <div
                className={`interest__item-head${open ? ' active' : ''}`}
                onClick={() => setOpen((prev) => !prev)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    e.preventDefault()
                    setOpen((prev) => !prev)
                }}
            >
                <img src={ category.image } alt="" />
                { category.name }
            </div>
            <div className={`interest__item-body${open ? ' show' : ''}`}>
                {category.interests.map((interest) => (
                    <label key={interest.id}>
                        <input
                            type="checkbox"
                            checked = { user.interests.includes(interest) }
                            onChange={ 
                                (e) => {
                                    if(user.interests.includes(interest)){
                                        setUserData({ ...user, interests: user.interests.filter((item) => item.id !== interest.id) })
                                    }else{
                                        setUserData({ ...user, interests: [...user.interests, interest] })
                                    }
                                } 
                            }/>
                        <span>{interest.name}</span>
                    </label>
                ))}
            </div>
        </div>
    )
}