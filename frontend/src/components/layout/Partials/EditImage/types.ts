export interface EditImageProps {
    image: File | null
    rules: string
    onChange: (image: File | null) => void
    currentImage: string | null
}

export interface EditImageBaseProps extends EditImageProps {
    className?: string
    placeholderClassName?: string
    alt: string
}