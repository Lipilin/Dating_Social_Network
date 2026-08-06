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
    user: UserResource, 
    icon?: string
    createdAt: string
}

export interface Request{
    take: number, 
    skip: number, 
}

export interface PostRequest{

}

export interface InterestResource{
    id: number, 
    name: string,
    image?: string,
    category?: CategoryWithInterestResource
}

export interface CategoryWithInterestResource{
    id: string,
    name: string, 
    icon: string, 
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
    id?: string
}

export enum GENDER{
    MALE='MALE',
    FEMALE='FEMALE'
}

export enum GENDER_PREFERENCE{
    MALE='MALE',
    FEMALE='FEMALE',
    ANYBODY='ANYBODY',
}


export interface Post{
    id: string
    title: string
    content: string
    image: string
    tags?: string[]
    createdAt: string
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
    city: string, 
    createdAt: Date,
    updatedAt: Date,
    gender?: GENDER
    interests?: InterestResource[]
}

export interface UserPostRequest extends PostRequest{
    login: string 
    email: string
    name: string  
    surname: string 
    password: string  
    confirmPassword: string
    age: number
    city: string
    gender: GENDER | ''
    description: string
    acceptService: boolean
    acceptSecurity: boolean
    interests: InterestResource[]
}
