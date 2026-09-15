import { useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import type { Page as PageResource } from '@/utils/api/types'
import { Page } from '@/utils/api/Page'
import { Loader } from '@/components/pages/Loader/Loader'
import styles from './StaticPage.module.css'
import { NotFound } from '../Errors/NotFound'

const pageProvider = new Page()

export function StaticPage() {
    const { pathname } = useLocation()
    const alias = pathname.replace(/^\//, '')
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState<PageResource | null>(null)

    useEffect(() => {
        async function loadPage() {
            if (!alias) return
            setIsLoading(true)
            const data = await pageProvider.getByAlias(alias)
            setPage(data)
            setIsLoading(false)
        }
        loadPage()
    }, [alias])

    if (isLoading) {
        return <Loader isLoading={isLoading} />
    }

    if (!page) return <NotFound />

    return (
        <div className={styles.page}>
            <div className={styles.content}>
                <h1 className={styles.title}>{page.name}</h1>
                <div
                    className={styles.body}
                    dangerouslySetInnerHTML={{ __html: page.content }}
                />
            </div>
        </div>
    )
}
