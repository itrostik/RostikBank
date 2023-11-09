import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'
import template from './auth-required-message.template.html'
import styles from './auth-required-message.module.scss'
import { $R } from '@/core/rquery/rquery.lib'

export class AuthRequiredMessage extends ChildComponent {
	constructor() {
		super()
	}
	render() {
		this.element = renderService.htmlToElement(template, [], styles)
		return this.element
	}
}
