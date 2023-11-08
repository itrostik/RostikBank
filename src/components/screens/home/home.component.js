import { BaseScreen } from '@/core/component/base-screen.component'
import template from './home.template.html'
import renderService from '@/core/services/render.service'
import styles from './home.module.scss'
import { $R } from '@/core/rquery/rquery.lib'
import { Button } from '@/components/UI/button/button.component'
import { Field } from '@/components/UI/field/field.component'
import { Heading } from '@/components/UI/heading/heading.component'
export class Home extends BaseScreen {
	constructor() {
		super({ title: 'Home' })
	}
	render() {
		const element = renderService.htmlToElement(template, [], styles)
		return element
	}
}
