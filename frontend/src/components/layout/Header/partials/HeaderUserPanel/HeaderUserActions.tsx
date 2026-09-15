import { Link } from 'react-router'
import { images } from '../../Header.images'

export function HeaderUserActions() {
    return (
        <div className="header__actions">
            <Link to="#" id="openChat">
                <img src={images['header_chat.svg']} alt="" />
            </Link>
        </div>
    )
}
