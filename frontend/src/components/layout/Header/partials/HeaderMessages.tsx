import { images } from '../Header.images'
import { ROUTES } from '@/config/General'

export function HeaderMessages() {
  return (
    <>
                  <div className="message-content-sms">
                      <div className="card-wrapper">
                          <div className="cards">
                              <div className="card">
                                  <a href={ROUTES.PROFILE.URL} className="img">
                                      <img src={images["account_img.png"]} alt="User Avatar" className="avatar" />
                                      <div className="badge">
                                          9
                                      </div>
                                  </a>
                                  <div className="info">
                                      <div className="info-item">
                                          <h3>
                                              <a href={ROUTES.PROFILE.URL}>Олеся Смирнова</a>
                                          </h3>
                                          <p>Товарищи! Дальнейшее развитие различных форм деятельности играет важную роль в
                                              формировании соответствующий условий ...</p>
                                          <div className="footer-sms">
                                              <a className="otvetit-button" href="#">Ответить</a>
                                              <span>8:41</span>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              <div className="card">
                                  <a href={ROUTES.PROFILE.URL} className="img">
                                      <img src={images["account_img.png"]} alt="User Avatar" className="avatar" />
                                      <div className="badge">
                                          9
                                      </div>
                                  </a>
                                  <div className="info">
                                      <div className="info-item">
                                          <h3>
                                              <a href={ROUTES.PROFILE.URL}>Олеся Смирнова</a>
                                          </h3>
                                          <p>Товарищи! Дальнейшее развитие различных форм деятельности играет важную роль в
                                              формировании соответствующий условий ...</p>
                                          <div className="footer-sms">
                                              <a className="otvetit-button" href="#">Ответить</a>
                                              <span>8:41</span>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              <div className="card">
                                  <a href={ROUTES.PROFILE.URL} className="img">
                                      <img src={images["account_img.png"]} alt="User Avatar" className="avatar" />
                                      <div className="badge">
                                          9
                                      </div>
                                  </a>
                                  <div className="info">
                                      <div className="info-item">
                                          <h3>
                                              <a href={ROUTES.PROFILE.URL}>Олеся Смирнова</a>
                                          </h3>
                                          <p>Товарищи! Дальнейшее развитие различных форм деятельности играет важную роль в
                                              формировании соответствующий условий ...</p>
                                          <div className="footer-sms">
                                              <a className="otvetit-button" href="#">Ответить</a>
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
