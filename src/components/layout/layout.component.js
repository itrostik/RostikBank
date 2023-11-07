import { Header } from '@/components/layout/header/header.component'
import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import styles from './layout.module.scss'
import template from './layout.template.html'
import { $R } from '@/core/rquery/rquery.lib'
export class Layout extends ChildComponent {
	constructor({ router, children }) {
		super()
		this.router = router
		this.children = children
	}

	render() {
		// const headerHTML = new Header().render()
		this.element = renderService.htmlToElement(template, [], styles)
		const mainElement = $R(this.element).find('main')

		const contentContainer = $R(this.element).find('#content')
		contentContainer.append(this.children)

		mainElement.before(new Header().render()).append(contentContainer.element)

		return this.element
	}
}
