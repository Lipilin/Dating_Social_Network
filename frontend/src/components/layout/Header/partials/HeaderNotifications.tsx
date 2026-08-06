import { images } from '../Header.images'
import { ROUTES } from '@/config/General'
import { Link } from 'react-router'

export function HeaderNotifications() {
  return (
    <>
                  <div className="settings ">
                      <div className="head-text">
                          <Link to="#">Ометить всё как прочитанное</Link>
                          <Link to="#">Настройки</Link>
                      </div>
                      <div className="cards-wrapper">
                          <div className="cards">
                              <div className="card">
                                  <Link to={ROUTES.PROFILE.URL} className="img">
                                      <img src={images["forum_1.png"]} alt="User Avatar" className="avatar" />
                                      <div className="badge">
                                          9
                                      </div>
                                  </Link>
                                  <div className="info">
                                      <div className="info-item">
                                          <h3>
                                              <Link to={ROUTES.PROFILE.URL}>Олеся Смирнова,</Link> отправила вам заявку в друзья
                                          </h3>
                                          <p>7 минуты назад</p>
                                      </div>
                                  </div>
                              </div>
                              <div className="card">
                                  <Link to={ROUTES.PROFILE.URL} className="img">
                                      <img src={images["forum_2.png"]} alt="User Avatar" className="avatar" />
                                      <div className="badge">
                                          9
                                      </div>
                                  </Link>
                                  <div className="info">
                                      <div className="info-item">
                                          <h3>
                                              <Link to={ROUTES.PROFILE.URL}>Олеся Смирнова,</Link> отправила вам заявку в друзья
                                          </h3>
                                          <p>7 минуты назад</p>
                                      </div>
                                  </div>
                              </div>
                              <div className="card">
                                  <Link to={ROUTES.PROFILE.URL} className="img">
                                      <img src={images["forum_2.png"]} alt="User Avatar" className="avatar" />
                                      <div className="badge">
                                          9
                                      </div>
                                  </Link>
                                  <div className="info">
                                      <div className="info-item">
                                          <h3>
                                              <Link to={ROUTES.PROFILE.URL}>Олеся Смирнова,</Link> отправила вам заявку в друзья
                                          </h3>
                                          <p>7 минуты назад</p>
                                      </div>
                                  </div>
                              </div>
                              <div className="card">
                                  <Link to={ROUTES.PROFILE.URL} className="img">
                                      <img src={images["forum_1.png"]} alt="User Avatar" className="avatar" />
                                      <div className="badge">
                                          9
                                      </div>
                                  </Link>
                                  <div className="info">
                                      <div className="info-item">
                                          <h3>
                                              <Link to={ROUTES.PROFILE.URL}>Олеся Смирнова,</Link> отправила вам заявку в друзья
                                          </h3>
                                          <p>7 минуты назад</p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="text">
                          <Link to="#">Показать все уведомления</Link>
                      </div>
                  </div>
    </>
  )
}
