import axios, { type AxiosResponse } from 'axios'
import type { UserResource, UserUpdatedRequest } from './types'
import type 
{ 
    UserPostRequest, 
    UserLoginRequest, 
    UserLoginResponse, 
    UserLogoutResponse, 
    UserUpdatedResponse,
    SendPasswordResetEmailRequest,
    SendPasswordResetEmailResponse,
} from './types'
import { API_SETTINGS } from '@/config/General'
import { HTTP_STATUS } from '@pick-me-up/common/config'
import { getApiErrorMessage } from './getApiErrorMessage'

export class User{

    #abortController = new AbortController()

    async login(request: UserLoginRequest): Promise<UserLoginResponse>{
        try{
            const response = await axios.post<UserLoginResponse>(
                `${ API_SETTINGS.API_HOST }${ API_SETTINGS.ENDPOINTS.USER.LOGIN }`,
                request
            )
            return response.data
        }catch(error){
            console.error(error)
            throw error
        }
    }

    async getProfile(id: number): Promise<UserResource | null>{
        try{
            const response = await axios.get(
                `${ API_SETTINGS.API_HOST }${ API_SETTINGS.ENDPOINTS.USER.LIST }?id=${ id }`
            )
            return response.data as UserResource
        } catch (error) {
            console.error(error)
            return null
        }
    }

    async createUser(request: UserPostRequest): Promise<UserResource>{
        try{
            const response = await axios.post<UserResource>(
                `${ API_SETTINGS.API_HOST }${ API_SETTINGS.ENDPOINTS.USER.CREATE }`, 
                request
            )
            return response.data
        } catch (error) {
            throw new Error(getApiErrorMessage(error))
        }
    }

    async refresh(): Promise<AxiosResponse>{
        const response = await axios.post(
            `${ API_SETTINGS.API_HOST }${ API_SETTINGS.ENDPOINTS.USER.REFRESH }`,
            {
                withCredentials: true,
            }
        )
        return response 
    }

    async withRefreshing<T>(callback: () => Promise<T>): Promise<T>{
        try{
            return await callback()
        }catch(error){
            if (axios.isAxiosError(error) && error.response?.status === HTTP_STATUS.UNAUTHORIZED){
                this.#abortController.abort()
                this.#abortController = new AbortController()
                const refreshResponse = await this.refresh()
                if(refreshResponse.status === HTTP_STATUS.UNAUTHORIZED){
                    throw Error()
                }
                return await callback()
            }
            throw error
        }
    }

    async getMe(): Promise<UserLoginResponse>{
        const response = await axios.get(
            `${ API_SETTINGS.API_HOST }${ API_SETTINGS.ENDPOINTS.USER.ME }`, 
            {
                signal: this.#abortController.signal, 
                withCredentials: true, 
            }
        )
        return response.data as UserLoginResponse
    }   

    async sendPasswordReset(request: SendPasswordResetEmailRequest): Promise<SendPasswordResetEmailResponse> {
        try {
            const response = await axios.post<SendPasswordResetEmailResponse>(
                `${API_SETTINGS.API_HOST}${API_SETTINGS.ENDPOINTS.EMAIL_NOTIFICATION.PASSWORD_RESET}`,
                request,
            )
            return response.data
        } catch (error) {
            throw new Error(getApiErrorMessage(error, 'Ошибка при отправке письма для восстановления пароля'))
        }
    }

    async logout(): Promise<UserLogoutResponse>{
        const response = await axios.post<UserLogoutResponse>(
            `${ API_SETTINGS.API_HOST }${ API_SETTINGS.ENDPOINTS.USER.LOGOUT }`,
            {
                withCredentials: true,
            }
        )
        return response.data
    }

    async updateProfile(request: UserUpdatedRequest): Promise<UserUpdatedResponse>{
        const hasFiles = request.avatarFile instanceof File || request.bannerFile instanceof File
        const payload = hasFiles
            ? this.#buildUpdateFormData(request)
            : { updatedUser: request.updatedUser }

        try {
            const response = await axios.patch<UserUpdatedResponse>(
                `${ API_SETTINGS.API_HOST }${ API_SETTINGS.ENDPOINTS.USER.UPDATE }`,
                payload,
                {
                    withCredentials: true,
                },
            )
            return response.data
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    #buildUpdateFormData(request: UserUpdatedRequest): FormData {
        const formData = new FormData()
        formData.append('updatedUser', JSON.stringify(request.updatedUser))

        if (request.avatarFile instanceof File) {
            formData.append('avatarFile', request.avatarFile)
        }

        if (request.bannerFile instanceof File) {
            formData.append('bannerFile', request.bannerFile)
        }

        return formData
    }
}