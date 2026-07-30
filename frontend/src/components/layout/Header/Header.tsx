import { HeaderLeft } from './partials/HeaderLeft'
import { HeaderGuestActions } from './partials/HeaderGuestActions'
import { HeaderUserPanel } from './partials/HeaderUserPanel'
import { HeaderMessages } from './partials/HeaderMessages'
import { HeaderNotifications } from './partials/HeaderNotifications'

export function Header() {
  return (
    <header className="header">
      <HeaderLeft />
      <HeaderGuestActions />
      <HeaderUserPanel />
      <HeaderMessages />
      <HeaderNotifications />
    </header>
  )
}
