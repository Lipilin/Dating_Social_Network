import type { Post as PostResource } from '@/utils/api/types'
import location1Png from '@/assets/images/location_1.png'
import location2Png from '@/assets/images/location_2.png'
import location3Png from '@/assets/images/location_3.png'

const locationImages = [location1Png, location2Png, location3Png]

function formatPostDate(date: string) {
    return new Date(date).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })
}

interface PostProps extends PostResource {
    imageIndex?: number
}

export function Post({
    title,
    content,
    tags = [],
    createdAt,
    image,
    imageIndex = 0,
}: PostProps) {
    const previewImage = image || locationImages[imageIndex % locationImages.length]

    return (
        <div className="locations__item">
            <div className="locations__item-left">
                <img className="locations__item-img" src={previewImage} alt="" />
                <div className="locations__item-info">
                    <div>
                        <div className="locations__item-place">{title}</div>
                        {tags.length > 0 && (
                            <div className="locations__item-tags">
                                {tags.map((tag) => (
                                    <a key={tag} href="#" className="tag">
                                        {tag}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="locations__item-published">
                        Опубликовано: <span>{formatPostDate(createdAt)}</span>
                    </div>
                </div>
            </div>
            <div className="locations__item-right">
                <div className="locations__item-desc">{content}</div>
                <div className="locations__item-bottom">
                    <a href="#" className="locations__item-btn">
                        <span>Подробнее</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="7" height="10" viewBox="0 0 7 10" fill="none">
                            <path d="M1 9L5 5L1 1" stroke="#0041F2" strokeWidth="2" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    )
}
