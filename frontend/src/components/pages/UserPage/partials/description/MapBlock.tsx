interface MapBlockProps {
    city?: string
}

export function MapBlock({ city }: MapBlockProps) {
    const mapQuery = encodeURIComponent(city || 'Москва')
    const mapSrc = `https://yandex.ru/map-widget/v1/?text=${mapQuery}&z=10`

    return (
        <div className="about__map">
            <div className="about__map-top">
                <h3>Я на карте</h3>
                <button type="button" aria-label="Развернуть карту">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                        <g clipPath="url(#clip0_map_expand)">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M6.92773 0H28.5423C30.3785 0.00353377 32.1386 0.734553 33.437 2.03299C34.7354 3.33143 35.4665 5.09147 35.47 6.92773V28.5423C35.4665 30.3785 34.7354 32.1386 33.437 33.437C32.1386 34.7354 30.3785 35.4665 28.5423 35.47H6.92773C5.09147 35.4665 3.33143 34.7354 2.03299 33.437C0.734553 32.1386 0.00353377 30.3785 0 28.5423L0 6.92773C0.00353377 5.09147 0.734553 3.33143 2.03299 2.03299C3.33143 0.734553 5.09147 0.00353377 6.92773 0V0Z"
                                fill="#D5D5DE"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_map_expand">
                                <rect width="35.47" height="35.47" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </button>
            </div>
            <div className="map">
                <iframe
                    src={mapSrc}
                    width="560"
                    height="400"
                    title={city ? `Карта: ${city}` : 'Карта'}
                    allowFullScreen
                />
            </div>
        </div>
    )
}
