import type {
    AnnouncementResource,
    GENDER,
    InterestResource,
    UserResource,
} from '@pick-me-up/common/type.js'
import { GENDER_PREFERENCE } from '@pick-me-up/common/type.js'
import type { Announcement, Category, Interest, User } from '@prisma/client'

export interface AnnouncementMultipartBody {
    announcement?: Partial<AnnouncementResource> & {
        id?: number
        genderPreference?: GENDER_PREFERENCE
    }
    id?: number
    title?: string
    departure?: string
    destination?: string
    dateFrom?: string
    dateTo?: string
    genderPreference?: GENDER_PREFERENCE
    userAge?: number
    description?: string
    icon?: string
    interests?: InterestResource[]
    createdAt?: string
}

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

type AnnouncementRequestSource = Partial<AnnouncementResource> & {
    id?: number
    genderPreference?: GENDER_PREFERENCE
}

function getAnnouncementRequestSource(body: AnnouncementMultipartBody): AnnouncementRequestSource {
    if (body.announcement) {
        return body.announcement
    }

    return body
}

export function fromAnnouncementRequestBodyToAnnouncementResource(
    body: AnnouncementMultipartBody,
): AnnouncementResource {
    const source = getAnnouncementRequestSource(body)
    const genderInterest = source.genderInterest
        ?? source.genderPreference
        ?? body.genderPreference
        ?? GENDER_PREFERENCE.ANYBODY

    const announcementResource: AnnouncementResource = {
        id: Number(source.id ?? body.id),
        title: source.title ?? body.title ?? '',
        userAge: source.userAge ?? body.userAge ?? 18,
        genderInterest,
        description: source.description ?? body.description ?? '',
        dateFrom: source.dateFrom ?? body.dateFrom ?? '',
        dateTo: source.dateTo ?? body.dateTo ?? '',
        destination: source.destination ?? body.destination ?? '',
        departure: source.departure ?? body.departure ?? '',
        icon: source.icon ?? body.icon ?? '',
        createdAt: source.createdAt ?? body.createdAt ?? new Date().toISOString(),
        interests: source.interests ?? body.interests ?? [],
    }

    return announcementResource
}

export function fromAnnouncementResourceToCreateInput(resource: AnnouncementResource) {
    return {
        title: resource.title,
        departure: resource.departure,
        destination: resource.destination,
        dateFrom: resource.dateFrom,
        dateTo: resource.dateTo,
        genderPreference: resource.genderInterest,
        userAge: resource.userAge,
        description: resource.description,
        icon: resource.icon ?? '',
        interests: resource.interests ?? [],
    }
}
