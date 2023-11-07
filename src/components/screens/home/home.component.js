import { BaseScreen } from '@/core/component/base-screen.component'
import template from './home.template.html'
import renderService from '@/core/services/render.service'
import styles from './home.module.scss'
import { $R } from '@/core/rquery/rquery.lib'
import { Button } from '@/components/UI/button/button.component'
import { Field } from '@/components/UI/field/field.component'
export class Home extends BaseScreen {
	constructor() {
		super({ title: 'Home' })
	}
	render() {
		const element = renderService.htmlToElement(
			template,
			[
				new Button({
					children: 'Send',
					onClick: () => console.log(52)
				}),
				new Field({
					placeholder: 'login',
					type: 'text',
					value: '52',
					name: 'login',
					variant: 'login'
				})
			],
			styles
		)
		$R(element).find('h1').css('color', 'green')
		console.log(element)
		return element
	}
}
