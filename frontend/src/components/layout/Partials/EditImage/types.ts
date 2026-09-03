export interface EditImageProps {
    image: File | null
    rules: string
    onChange: (image: File | null) => void
}

export interface EditImageBaseProps extends EditImageProps {
    className?: string
    placeholderClassName?: string
    alt: string
}