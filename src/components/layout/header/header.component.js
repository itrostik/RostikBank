import renderService from '@/core/services/render.service'
import notificationService from '@/core/services/notification.service'

import ChildComponent from '@/core/component/child.component'
import { UserItem } from '@/components/UI/user-item/user-item.component'

import template from './header.template.html'
import styles from './header.module.scss'

import { Logo } from './logo/logo.component'
import { LogoutButton } from './logout-button/logout-button.component'
import { Search } from './search/search.component'

export class Header extends ChildComponent {
  constructor({ router }) {
    super()
    this.router = router
  }

  render() {
    this.element = renderService.htmlToElement(
      template,
      [
        Logo,
        new LogoutButton({
          router: this.router
        }),
        Search,
        new UserItem({
          user: {
            name: '52NGG',
            avatarPath:
              'https://m.the-flow.ru/uploads/images/origin/07/28/51/43/64/26f5c60.jpg'
          }
        })
      ],
      styles
    )
    return this.element
  }
}
