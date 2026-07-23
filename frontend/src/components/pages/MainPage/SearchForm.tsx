import selectArrowSvg from '@/assets/images/select_arrow.svg'

export function SearchForm() {
  return (
    <section className="search">
      <div className="container">
        <form action="">
          <div className="search__top">
            <div className="search__top-item">
              <div className="input-data">
                <input type="text" required={true} id="selected-values" />
                <label className="label" htmlFor="">Я ищу</label>
                <img src={selectArrowSvg} alt="" className="arrow-toogle" />
                <div id="checkbox-list" className="checkbox-list">
                  <label className="label-list">
                    <input type="checkbox" name="search_option" value="devushku" />
                    <span>Девушку</span>
                  </label>
                  <label className="label-list">
                    <input type="checkbox" name="search_option" value="parnya" />
                    <span>Парня</span>
                  </label>
                  <label className="label-list">
                    <input type="checkbox" name="search_option" value="kompaniyu" />
                    <span>Компанию</span>
                  </label>
                  <label className="label-list">
                    <input type="checkbox" name="search_option" value="kogo_nibud" id="kogo_nibud" />
                    <span>Кого нибудь</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="search__top-item">
              <div className="input-data">
                <input type="text" required={true} id="selected-values-2" />
                <label className="label" htmlFor="">Цель</label>
                <img src={selectArrowSvg} alt="" className="arrow-toogle" />
                <div className="checkbox-list">
                  <label className="label-list">
                    <input type="checkbox" name="interests" value="puteshestviya" />
                    <span>Путешествия</span>
                  </label>
                  <label className="label-list">
                    <input type="checkbox" name="interests" value="pohod" />
                    <span>Поход</span>
                  </label>
                  <label className="label-list">
                    <input type="checkbox" name="interests" value="druzhba" />
                    <span>Дружба</span>
                  </label>
                  <label className="label-list">
                    <input type="checkbox" name="interests" value="obshenie" />
                    <span>Общение</span>
                  </label>
                  <label className="label-list">
                    <input type="checkbox" name="interests" value="sponsorstvo" />
                    <span>Спонсорство</span>
                  </label>
                  <label className="label-list">
                    <input type="checkbox" name="interests" value="xobbi" />
                    <span>Хобби</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="search__top-item">
              <div className="place">
                <input type="text" placeholder=" " />
                <label className="label">От куда</label>
              </div>
            </div>
            <div className="search__top-item">
              <div className="place">
                <input type="text" placeholder=" " />
                <label htmlFor="">Куда</label>
              </div>
            </div>
          </div>
          <div className="search__bottom">
            <div className="search__bottom-left">
              <label className="search__bottom-checkbox">
                <input type="checkbox" name="smoking" id="smoking" />
                <span></span>
                Курящий
              </label>
              <label className="search__bottom-checkbox">
                <input type="checkbox" name="drinking" id="drinking" />
                <span></span>
                Пьющий
              </label>
              <label className="search__bottom-checkbox">
                <input type="checkbox" name="car" id="car" />
                <span></span>
                Имеет авто
              </label>
              <a href="#" className="search__other">
                Дополнительные параметры
                <div className="arrow">
                  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="7" viewBox="0 0 11 7" fill="none">
                    <path d="M1 1.25L5.5 5.75L10 1.25" stroke="#4C5D8B" strokeWidth="2" strokeLinejoin="round" />
                  </svg>
                </div>
              </a>
            </div>
            <div className="search__bottom-right">
              <button className="show_map">Показать на карте</button>
              <button className="search__btn">Найти</button>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}