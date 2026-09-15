import type { UserResource } from "@/utils/api/types"

export interface Profile extends UserResource{
    isCurrentProfile: boolean
}