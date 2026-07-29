export interface AnnouncementResource{
    id: string, 
    userName: string, 
    userAge: number, 
    genderPreference: string, 
    description: string, 
    dateFrom: Date, 
    dateTo: Date, 
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

export enum GENDER_PREFERENCE{
    MALE='MALE',
    FEMALE='FEMALE',
    ANYBODY='ANYBODY',
}