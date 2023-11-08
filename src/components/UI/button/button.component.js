import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'
import template from './button.template.html'
import styles from './button.module.scss'
import { $R } from '@/core/rquery/rquery.lib'

export class Button extends ChildComponent {
  constructor({ children, onClick }) {
    super()
    if (!children) throw new Error('Children is empty!')
    this.children = children
    this.onClick = onClick
  }

  render() {
    this.element = renderService.htmlToElement(template, [], styles)
    $R(this.element).html(this.children).click(this.onClick)
    return this.element
  }
}
