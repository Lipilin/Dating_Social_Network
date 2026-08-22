import type {
    AnnouncementResource,
    GENDER,
    GENDER_PREFERENCE,
    InterestResource,
    UserResource,
} from '@boltaem/common/type.js'
import type { Announcement, Category, Interest, User } from '@prisma/client'

type AnnouncementUser = Pick<
    User,
    | 'id'
    | 'email'
    | 'name'
    | 'surname'
    | 'description'
    | 'avatar'
    | 'banner'
    | 'createdAt'
    | 'updatedAt'
    | 'lastSeen'
    | 'age'
    | 'city'
    | 'gender'
>

export type AnnouncementWithRelations = Announcement & {
    user: AnnouncementUser
    interests?: (Interest & { category: Category })[]
}

function fromUserToResource(user: AnnouncementUser): UserResource {
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        surname: user.surname ?? '',
        description: user.description ?? '',
        avatar: user.avatar ?? '',
        banner: user.banner ?? '',
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        gender: user.gender as GENDER,
        city: user.city,
        lastSeen: user.lastSeen ?? user.createdAt,
        age: user.age,
    }
}

function fromInterestToResource(interest: Interest & { category?: Category }): InterestResource {
    const resource: InterestResource = {
        id: interest.id,
        name: interest.name,
        image: interest.image ?? '',
    }

    if (interest.category) {
        resource.category = {
            id: interest.category.id,
            name: interest.category.name,
            icon: interest.category.icon,
            isCountry: interest.category.isCountry,
        }
    }

    return resource
}

export function fromAnnouncementToResource(announcement: AnnouncementWithRelations): AnnouncementResource {
    const resource: AnnouncementResource = {
        id: announcement.id,
        title: announcement.title ?? '',
        userAge: announcement.user.age,
        genderInterest: announcement.genderInterest as GENDER_PREFERENCE,
        description: announcement.description ?? '',
        dateFrom: announcement.dateFrom.toISOString(),
        dateTo: announcement.dateTo.toISOString(),
        destination: announcement.destination ?? '',
        departure: announcement.departure ?? '',
        icon: announcement.icon ?? '',
        createdAt: announcement.createdAt.toISOString(),
        user: fromUserToResource(announcement.user),
    }

    if (announcement.interests) {
        resource.interests = announcement.interests.map(fromInterestToResource)
    }

    return resource
}
