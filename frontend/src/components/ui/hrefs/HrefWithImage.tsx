import { Link } from 'react-router'
interface HrefWithImageProps{
    content: string,
    image: string,
    link: string, 
    classNames?: string
}

export function HrefWithImage({ content, image, link, classNames }: HrefWithImageProps){
    return (
        <Link to={link} className={classNames}><span>{content}</span>
            <img src = { image } />
        </Link>
    )
}