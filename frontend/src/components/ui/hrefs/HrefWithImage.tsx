interface HrefWithImageProps{
    content: string,
    image: string,
    link: string, 
    classNames?: string
}

export function HrefWithImage({ content, image, link, classNames }: HrefWithImageProps){
    return (
        <a href={link} className={classNames}><span>{content}</span>
            <img src = { image } />
        </a>
    )
}