import { Link } from 'react-router'
import { STATIC_ROUTES_FOR_BUTTOS } from '@/config/General'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="copy_write">2005-2026 © Boltaem. </div>
          <div className="footer__links">
            <Link to={STATIC_ROUTES_FOR_BUTTOS.TERMS}>Условия использования</Link>
            <Link to={STATIC_ROUTES_FOR_BUTTOS.PRIVACY}>Политика конфиденциальности</Link>
            <Link to={STATIC_ROUTES_FOR_BUTTOS.HELP}>Помощь</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
