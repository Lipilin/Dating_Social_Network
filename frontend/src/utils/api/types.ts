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
    interests: InterestResource[],
    isCountry: boolean
}

export interface AnnouncementRequest{
    pagination: number, 
    genderPreference?: GENDER_PREFERENCE, 
    destination?: string
    departure?: string
}

export enum GENDER_PREFERENCE{
    MALE='MALE',
    FEMALE='FEMALE',
    ANYBODY='ANYBODY',
}