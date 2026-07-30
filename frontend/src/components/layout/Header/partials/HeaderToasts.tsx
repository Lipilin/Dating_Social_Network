import { images } from '../Header.images'

export function HeaderToasts() {
  return (
    <>
                  <div className="toast__container">
                      <div className="toast__item friend_request">
                          <div className="close-btn">
                              <img src={images["close-btn.svg"]} alt="Close btn" />
                          </div>
                          <div className="toast__item-content">
                              <div className="toast__item-avatar">
                                  <img src={images["forum_2.png"]} alt="" />
                                  <span>9</span>
                              </div>
                              <div className="toast__item-text">
                                  <h3>Олеся Смирнова<span>, отправила вам заявку в друзья</span></h3>
                              </div>
                          </div>
                          <div className="toast__item-buttons">
                              <button type="button" className="accept">Принять</button>
                              <button type="button" className="decline">Отклонить</button>
                          </div>
                      </div>
                      <div className="toast__item message">
                          <div className="close-btn"><img src={images["close-btn.svg"]} alt="Close btn" /></div>
                          <div className="toast__item-content">
                              <div className="toast__item-avatar">
                                  <img src={images["forum_2.png"]} alt="" />
                                  <span>9</span>
                              </div>
                              <div className="toast__item-text">
                                  <h3>Олеся Смирнова</h3>
                                  <p>
                                      Товарищи! Дальнейшее развитие различных форм деятельности играет важную роль в
                                      формировании соответствующий условий ...
                                  </p>
                                  <div className="toast__item-text-bottom">
                                      <a href="#" className="answer">Ответить</a>
                                      <div className="time">8:41</div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
    </>
  )
}
