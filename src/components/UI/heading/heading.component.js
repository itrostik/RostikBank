import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'
import template from './heading.template.html'
import styles from './heading.module.scss'
import { $R } from '@/core/rquery/rquery.lib'

export class Heading extends ChildComponent {
  constructor({ title = '' }) {
    super()
    this.title = title
  }

  render() {
    this.element = renderService.htmlToElement(template, [], styles)
    $R(this.element).text(this.title)
    return this.element
  }
}
