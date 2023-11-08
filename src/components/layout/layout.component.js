import ChildComponent from '@/core/component/child.component'
import { $R } from '@/core/rquery/rquery.lib'
import renderService from '@/core/services/render.service'

import styles from './layout.module.scss'
import template from './layout.template.html'

import { Header } from './header/header.component'
import { Notification } from './notification/notification.component'

export class Layout extends ChildComponent {
	constructor({ router, children }) {
		super()

		this.router = router
		this.children = children
	}

	render() {
		this.element = renderService.htmlToElement(template, [Notification], styles)

		const mainElement = $R(this.element).find('main')

		const contentContainer = $R(this.element).find('#content')
		contentContainer.append(this.children)

		mainElement
			.before(
				new Header({
					router: this.router
				}).render()
			)
			.append(contentContainer.element)

		return this.element
	}
}
