import { useContext } from 'react'
import { ProfileContext } from '../context/ProfileContext'

export function useProfile(){
    const context = useContext(ProfileContext)
}