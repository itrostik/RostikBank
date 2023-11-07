import { BaseScreen } from '@/core/component/base-screen.component'
import template from './home.template.html'
import renderService from '@/core/services/render.service'
export class Home extends BaseScreen {
	constructor() {
		super({ title: 'Home' })
	}
	render() {
		const element = renderService.htmlToElement(template)
		return '<p>Home</p>'
	}
}
