export function Banner() {
    return (
        <section className="hero">
            <div className="container">
                <div className="row">
                    <div className="hero__card big">
                        <div className="hero__card-name">
                        Отдыхайте и общайтесь вместе
                        </div>
                        <button className="hero__card-btn" id="openAuth">Пройти регистрацию</button>
                    </div>
                    <div className="hero__card small">
                        <div className="hero__card-name">
                            Найти собеседника на карте
                        </div>
                        <a href="#">Поиск на карте</a>
                    </div>
                </div>
            </div>
        </section>
    )
}
