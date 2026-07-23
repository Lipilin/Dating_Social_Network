import * as Images from './MainPage.images'

export function InterestBlock() {
  return (
    <div className="friends__content">
      <h3>Друзья по интересам</h3>
      
        <div className="friends__interests">
            <div className="friends__interests-row">
                <div className="friends__interests-item">
                    <h4>
                        <img src={Images.bikeSvg} alt="" />
                        Активный отдых
                    </h4>
                    <div className="friends__actions">
                        <a href="#">Велосипед</a>
                    </div>
                </div>
            </div>
        </div>
        <a href="#" className="friends__others">
            Показать все интересы
            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="16" viewBox="0 0 9 16"
                fill="none">
                <path d="M1 14.5L7.5 8L1 1.5" stroke="#0041F2" strokeWidth="2" />
            </svg>
        </a>
    </div>
  )
}
