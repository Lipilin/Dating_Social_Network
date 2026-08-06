import { Link } from 'react-router'
export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="copy_write">2005-2021 © Boltaem. </div>
          <div className="footer__links">
            <Link to="#">Условия использования</Link>
            <Link to="#">Политика конфиденциальности</Link>
            <Link to="#">Помощь</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
