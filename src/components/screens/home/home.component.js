import { BaseScreen } from '@/core/component/base-screen.component'
import renderService from '@/core/services/render.service'

import styles from './home.module.scss'
import template from './home.template.html'
import { CardInfo } from '@/components/screens/home/card-info/card-info.component'
import { Actions } from '@/components/screens/home/actions/actions.component'
import { Contacts } from '@/components/screens/home/contacts/contacts.component'
import { Transactions } from '@/components/screens/home/transactions/transactions.component'
import { Statistics } from '@/components/screens/statistics/statistics.component'
import { Store } from '@/core/store/store'
import { AuthRequiredMessage } from '@/components/ui/auth-required-message/auth-required-message.component'
import { $R } from '@/core/rquery/rquery.lib'

export class Home extends BaseScreen {
	constructor() {
		super({ title: 'Home' })
		this.store = Store.getInstance()
		this.store.addObserver(this)

		this.components = {
			cardInfo: null,
			transactions: null,
			statistics: null
		}
	}

	update() {
		this.user = this.store.state.user
		if (!this.user) {
			$R(this.element).html(new AuthRequiredMessage().render().outerHTML)
		}
	}
	createOrUpdateComponent(component, componentName) {
		if (this.components[componentName]) {
			this.components[componentName].destroy()
		}
		this.components[componentName] = new component()
		return this.components[componentName]
	}
	render() {
		const componentsToRender = [
			this.createOrUpdateComponent(CardInfo, 'cardInfo'),
			this.createOrUpdateComponent(Transactions, 'transactions'),
			this.createOrUpdateComponent(Statistics, 'statistics'),
			Actions,
			Contacts
		]
		this.element = renderService.htmlToElement(
			template,
			componentsToRender,
			styles
		)
		this.update()
		return this.element
	}
}
