export interface AnnouncementResource{
    id: string, 
    title: string, 
    userAge: number, 
    genderInterest: GENDER_PREFERENCE, 
    description: string, 
    dateFrom: string, 
    dateTo: string, 
    destination: string, 
    departure: string, 
    user: UserResource
}

export interface Request{
    take: number, 
    skip: number, 
}

export interface InterestResource{
    id: number, 
    name: string,
    image?: string,
}

export interface CategoryWithInterestResource{
    id: string,
    name: string, 
    image: string, 
    isCountry: boolean, 
    interests: InterestResource[],
}

export interface CategoryRequest extends Request{
    
}

export interface AnnouncementRequest extends Request{
    gender?: GENDER_PREFERENCE | null,
    purpose?: InterestResource[],
    departure?: string,
    destination?: string
}

export enum GENDER_PREFERENCE{
    MALE='MALE',
    FEMALE='FEMALE',
    ANYBODY='ANYBODY',
}

export interface Post{

}

export interface UserResource{
    id: string, 
    email: string, 
    name: string,
    surname: string, 
    description: string,
    avatar?: string, 
    banner?: string, 
    announcements: AnnouncementResource[],
    posts: Post[], 
    lastSeen: string,
    age: number,
}
