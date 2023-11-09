import { BaseScreen } from '@/core/component/base-screen.component'
import renderService from '@/core/services/render.service'
import template from '@/components/screens/not-found/not-found.template.html'
import styles from '@/components/screens/not-found/not-found.module.scss'

export class NotFound extends BaseScreen {
	constructor() {
		super({ title: 'Not Found' })
	}
	render() {
		this.element = renderService.htmlToElement(template, [], styles)
		return this.element
	}
}
