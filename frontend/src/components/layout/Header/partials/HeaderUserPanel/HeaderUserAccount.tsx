import { useEffect, useMemo, useRef, useState } from 'react'
import { GENDER, type UserResource } from '@/utils/api/types'
import { default as femaleAvatar } from '@/assets/images/avatar_female.png'
import { default as maleAvatar } from '@/assets/images/avatar_male.webp'
import { HeaderUserAccountMenu } from './HeaderUserAccountMenu'

interface HeaderUserAccountProps {
    user: UserResource
}

export function HeaderUserAccount({ user }: HeaderUserAccountProps) {
    const [open, setOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const avatarSrc = useMemo(() => {
        if (user.avatar) return user.avatar
        if (user.gender === GENDER.FEMALE) return femaleAvatar
        return maleAvatar
    }, [user])

    useEffect(() => {
        if (!open) {
            return
        }

        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [open])

    return (
        <div className="header__acc" ref={containerRef}>
            <div className="dropdown-toggle" onClick={() => setOpen((prev) => !prev)}>
                <img
                    src={avatarSrc}
                    alt={user.name}
                    style={{ objectFit: 'cover', borderRadius: '50%' }}
                />
            </div>
            <div className={`dropdown-menu${open ? ' active' : ''}`}>
                <HeaderUserAccountMenu user={user} />
            </div>
        </div>
    )
}
