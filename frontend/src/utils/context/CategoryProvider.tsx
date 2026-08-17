import { useEffect, useState } from "react"
import { CategoryContext } from "./CategoryContext"
import type { CategoryWithInterestResource } from "@/utils/api/types"
import { Category } from "@/utils/api/Category"

const category = new Category()

export function CategoryProvider({children}: {children: React.ReactNode}){
    const [categories, setCategories] = useState<CategoryWithInterestResource[]>([])
    const [isLoaded, setIsLoaded] = useState(false)
    useEffect(() =>{
        async function getCategories() {
            const categories = await category.getCategories({})
            setCategories(categories)
            setIsLoaded(true)
        }
        getCategories()
    }, [])

    const contextValue = {
        categories: categories,
        setCategories: setCategories,
        isLoaded: isLoaded,
    }

    return (
        <CategoryContext.Provider value={contextValue}>
            {children}
        </CategoryContext.Provider>
    )
}