export interface EditImageProps {
    imageSrc?: string
    rules: string
    onChange: (image: File) => void
}

export interface EditImageBaseProps extends EditImageProps {
    className?: string
    placeholderClassName?: string
    alt: string
}
