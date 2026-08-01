import { images } from '../Header.images'
import { ROUTES } from '@/config/General'

export function HeaderNotifications() {
  return (
    <>
                  <div className="settings ">
                      <div className="head-text">
                          <a href="#">Ометить всё как прочитанное</a>
                          <a href="#">Настройки</a>
                      </div>
                      <div className="cards-wrapper">
                          <div className="cards">
                              <div className="card">
                                  <a href={ROUTES.PROFILE.URL} className="img">
                                      <img src={images["forum_1.png"]} alt="User Avatar" className="avatar" />
                                      <div className="badge">
                                          9
                                      </div>
                                  </a>
                                  <div className="info">
                                      <div className="info-item">
                                          <h3>
                                              <a href={ROUTES.PROFILE.URL}>Олеся Смирнова,</a> отправила вам заявку в друзья
                                          </h3>
                                          <p>7 минуты назад</p>
                                      </div>
                                  </div>
                              </div>
                              <div className="card">
                                  <a href={ROUTES.PROFILE.URL} className="img">
                                      <img src={images["forum_2.png"]} alt="User Avatar" className="avatar" />
                                      <div className="badge">
                                          9
                                      </div>
                                  </a>
                                  <div className="info">
                                      <div className="info-item">
                                          <h3>
                                              <a href={ROUTES.PROFILE.URL}>Олеся Смирнова,</a> отправила вам заявку в друзья
                                          </h3>
                                          <p>7 минуты назад</p>
                                      </div>
                                  </div>
                              </div>
                              <div className="card">
                                  <a href={ROUTES.PROFILE.URL} className="img">
                                      <img src={images["forum_2.png"]} alt="User Avatar" className="avatar" />
                                      <div className="badge">
                                          9
                                      </div>
                                  </a>
                                  <div className="info">
                                      <div className="info-item">
                                          <h3>
                                              <a href={ROUTES.PROFILE.URL}>Олеся Смирнова,</a> отправила вам заявку в друзья
                                          </h3>
                                          <p>7 минуты назад</p>
                                      </div>
                                  </div>
                              </div>
                              <div className="card">
                                  <a href={ROUTES.PROFILE.URL} className="img">
                                      <img src={images["forum_1.png"]} alt="User Avatar" className="avatar" />
                                      <div className="badge">
                                          9
                                      </div>
                                  </a>
                                  <div className="info">
                                      <div className="info-item">
                                          <h3>
                                              <a href={ROUTES.PROFILE.URL}>Олеся Смирнова,</a> отправила вам заявку в друзья
                                          </h3>
                                          <p>7 минуты назад</p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="text">
                          <a href="#">Показать все уведомления</a>
                      </div>
                  </div>
    </>
  )
}
