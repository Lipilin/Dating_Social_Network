export interface AnnouncementResource{
    id: number, 
    title: string, 
    userAge: number, 
    genderInterest: GENDER_PREFERENCE, 
    description: string, 
    dateFrom: string, 
    dateTo: string, 
    destination: string, 
    departure: string, 
    user?: UserResource, 
    icon?: string
    createdAt: string
    interests?: InterestResource[]
}

export interface Request{
    take?: number, 
    skip?: number, 
}

export interface PostRequest{

}

export interface InterestResource{
    id: number, 
    name: string,
    image?: string,
    category?: CategoryResource
}

export interface CategoryResource{
    id: number, 
    name: string, 
    icon: string, 
    isCountry: boolean, 
}

export interface CategoryWithInterestResource extends CategoryResource{
    interests: InterestResource[],
}

export interface CategoryRequest extends Request{
    
}

export interface AnnouncementRequest extends Request{
    gender?: GENDER_PREFERENCE | null,
    purpose?: InterestResource[],
    departure?: string,
    destination?: string
    id?: number
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
    id: number
    title: string
    content: string
    image: string
    tags?: string[]
    createdAt: Date
    user?: UserResource
}

export interface UserResource{
    id: number, 
    email: string, 
    name: string,
    surname: string, 
    description: string,
    lastSeen: Date,
    age: number,
    city: string, 
    createdAt: Date,
    updatedAt: Date,
    gender: GENDER, 
    interests?: InterestResource[], 
    avatar?: string, 
    banner?: string,
    announcements?: AnnouncementResource[],
    posts?: Post[],  
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

export interface PostRequest extends Request{
    
}

export interface PatchRequest{

}

export interface ApiErrorResponse {
    message: string
}

export interface ApiSuccessResponse {
    message: string
}

export interface PatchResponse {
    message: string
}

export interface Page{
    id: number
    name: string
    alias: string
    content: string
}

export interface PageRequest extends Request{
    alias?: string
}

export interface UserLoginRequest extends PostRequest{
    email: string
    password: string
    rememberMe: boolean
}

export interface UserLoginResponse{
    user: UserResource
    accessToken: string
    refreshToken: string
}

export interface UserLogoutResponse{
    message: string
    user: UserResource | null
}

export interface UserUpdatedRequest extends PatchRequest{
    updatedUser: UserResource
}

export interface UserUpdatedResponse extends PatchResponse {
    user: UserResource
}

export type CreatePostRequest = Pick<Post, 'title' | 'content' | 'tags' | 'image'> & PostRequest

export interface CreatePostResponse{
    message: string
}

export interface AnnouncementCreateRequest extends PostRequest{
    title: string
    departure: string
    destination: string
    dateFrom: string
    dateTo: string
    genderPreference: GENDER_PREFERENCE
    userAge: number
    description: string
    icon: string
    interests: InterestResource[]
}

export interface AnnouncementCreateResponse{
    message: string
}

export interface SendRegistrationEmailRequest extends PostRequest {
    email: string
    name: string
    login: string
}

export interface SendPasswordResetEmailRequest extends PostRequest {
    email: string
    resetLink: string
}