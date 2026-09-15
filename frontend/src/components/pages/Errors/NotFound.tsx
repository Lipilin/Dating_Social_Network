export function NotFound(){
    return (
        <section className="not-found">
            <div className="container">
                <div className="not-found__card">
                    <div className="not-found__icon" aria-hidden="true">
                        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M16 3C9.37258 3 4 8.37258 4 15C4 21.6274 9.37258 27 16 27C22.6274 27 28 21.6274 28 15C28 8.37258 22.6274 3 16 3Z"
                                stroke="#0041F2"
                                strokeWidth="2"
                            />
                            <path d="M16 10V16" stroke="#0041F2" strokeWidth="2" strokeLinecap="round"/>
                            <circle cx="16" cy="20.5" r="1.5" fill="#0041F2"/>
                        </svg>
                    </div>
                    <h1>404. Страница не найдена</h1>
                </div>
            </div>
        </section>
    )
}
