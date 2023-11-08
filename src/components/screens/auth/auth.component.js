import { BaseScreen } from '@/core/component/base-screen.component'
import renderService from '@/core/services/render.service'
import template from './auth.template.html'
import styles from './auth.module.scss'

export class Auth extends BaseScreen {
  constructor() {
    super({ title: 'Auth' })
  }

  render() {
    this.element = renderService.htmlToElement(template, [], styles)
    return this.element
  }
}
