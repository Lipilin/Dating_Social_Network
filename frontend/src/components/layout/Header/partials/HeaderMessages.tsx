import { images } from '../Header.images'
import { ROUTES } from '@/config/General'
import { Link } from 'react-router'

export function HeaderMessages() {
  return (
    <>
                  <div className="message-content-sms">
                      <div className="card-wrapper">
                          <div className="cards">
                              <div className="card">
                                  <Link to={ROUTES.PROFILE.URL} className="img">
                                      <img src={images["account_img.png"]} alt="User Avatar" className="avatar" />
                                      <div className="badge">
                                          9
                                      </div>
                                  </Link>
                                  <div className="info">
                                      <div className="info-item">
                                          <h3>
                                              <Link to={ROUTES.PROFILE.URL}>Олеся Смирнова</Link>
                                          </h3>
                                          <p>Товарищи! Дальнейшее развитие различных форм деятельности играет важную роль в
                                              формировании соответствующий условий ...</p>
                                          <div className="footer-sms">
                                              <Link className="otvetit-button" to="#">Ответить</Link>
                                              <span>8:41</span>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              <div className="card">
                                  <Link to={ROUTES.PROFILE.URL} className="img">
                                      <img src={images["account_img.png"]} alt="User Avatar" className="avatar" />
                                      <div className="badge">
                                          9
                                      </div>
                                  </Link>
                                  <div className="info">
                                      <div className="info-item">
                                          <h3>
                                              <Link to={ROUTES.PROFILE.URL}>Олеся Смирнова</Link>
                                          </h3>
                                          <p>Товарищи! Дальнейшее развитие различных форм деятельности играет важную роль в
                                              формировании соответствующий условий ...</p>
                                          <div className="footer-sms">
                                              <Link className="otvetit-button" to="#">Ответить</Link>
                                              <span>8:41</span>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              <div className="card">
                                  <Link to={ROUTES.PROFILE.URL} className="img">
                                      <img src={images["account_img.png"]} alt="User Avatar" className="avatar" />
                                      <div className="badge">
                                          9
                                      </div>
                                  </Link>
                                  <div className="info">
                                      <div className="info-item">
                                          <h3>
                                              <Link to={ROUTES.PROFILE.URL}>Олеся Смирнова</Link>
                                          </h3>
                                          <p>Товарищи! Дальнейшее развитие различных форм деятельности играет важную роль в
                                              формировании соответствующий условий ...</p>
                                          <div className="footer-sms">
                                              <Link className="otvetit-button" to="#">Ответить</Link>
                                              <span>8:41</span>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
    </>
  )
}
