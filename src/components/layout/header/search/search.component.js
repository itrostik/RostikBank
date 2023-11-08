import renderService from '@/core/services/render.service'
import ChildComponent from '@/core/component/child.component'

import template from './search.template.html'
import styles from './search.module.scss'
import { $R } from '@/core/rquery/rquery.lib'

export class Search extends ChildComponent {
  render() {
    this.element = renderService.htmlToElement(template, [], styles)
    $R(this.element).find('input').input({
      type: 'search',
      name: 'search',
      placeholder: 'Поиск контактов'
    })
    return this.element
  }
}
