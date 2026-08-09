import { Link } from 'react-router'
import { ROUTES } from '@/config/General'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="copy_write">2005-2021 © Boltaem. </div>
          <div className="footer__links">
            <Link to={ROUTES.BOLTAEM_TERMS.URL}>Условия использования</Link>
            <Link to={ROUTES.BOLTAEM_PRIVACY.URL}>Политика конфиденциальности</Link>
            <Link to={ROUTES.BOLTAEM_HELP.URL}>Помощь</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
