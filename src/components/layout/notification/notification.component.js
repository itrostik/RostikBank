import renderService from '@/core/services/render.service'
import ChildComponent from '@/core/component/child.component'

import template from './notification.template.html'
import styles from './notification.module.scss'

export class Notification extends ChildComponent {
  render() {
    this.element = renderService.htmlToElement(template, [], styles)
    return this.element
  }
}
