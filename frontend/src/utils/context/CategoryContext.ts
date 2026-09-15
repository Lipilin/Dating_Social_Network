import { createContext } from "react"
import type { CategoryWithInterestResource } from "@/utils/api/types"

interface CategoryContextType{
    categories: CategoryWithInterestResource[]
    setCategories: (categories: CategoryWithInterestResource[]) => void
    isLoaded: boolean
}

export const CategoryContext = createContext<CategoryContextType>({
    categories: [],
    setCategories: () => {},
    isLoaded: false,
})