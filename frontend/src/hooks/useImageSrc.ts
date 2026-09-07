import { useEffect, useMemo } from 'react'

export function useImageSrc(imageFile?: File, remoteSrc?: string): string | undefined {
    const previewUrl = useMemo(() => {
        if (!imageFile) return undefined
        return URL.createObjectURL(imageFile)
    }, [imageFile])

    useEffect(() => {
        if (!previewUrl) return
        return () => URL.revokeObjectURL(previewUrl)
    }, [previewUrl])

    if (imageFile) return previewUrl
    return remoteSrc || undefined
}
