import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import styles from './contacts.module.scss'
import template from './contacts.template.html'
import { CardService } from '@/api/card.service'
import { Store } from '@/core/store/store'
import { $R } from '@/core/rquery/rquery.lib'
import {
	formatCardNumber,
	formatCardNumberWithDashes
} from '@/utils/format/format-card-number'
import { formatToCurrency } from '@/utils/format/format-to-currency'
import { BALANCE_UPDATED } from '@/constants/event.constants'
import {
	TRANSFER_FIELD_SELECTOR,
	TransferField
} from '@/components/screens/home/contacts/transfer-field/transfer-field.component'
import { Heading } from '@/components/ui/heading/heading.component'
import { UserService } from '@/api/user.service'
import {
	Loader,
	LOADER_SELECTOR
} from '@/components/ui/loader/loader.component'
import { UserItem } from '@/components/ui/user-item/user-item.component'

export class Contacts extends ChildComponent {
	constructor() {
		super()
		this.store = Store.getInstance().state
		this.userService = new UserService()
	}
	fetchData() {
		this.userService.getAll(null, data => {
			if (!data) return
			this.element.querySelector(LOADER_SELECTOR).remove()
			for (const contact of data) {
				$R(this.element)
					.find('#contacts-list')
					.append(
						new UserItem(contact, true, () => {
							$R(TRANSFER_FIELD_SELECTOR).value(
								formatCardNumberWithDashes(contact.card.number)
							)
						}).render()
					)
			}
		})
	}
	render() {
		this.element = renderService.htmlToElement(
			template,
			[new Heading('Перевести деньги'), TransferField],
			styles
		)
		if (this.store.user) {
			$R(this.element)
				.find('#contacts-list')
				.html(new Loader().render().outerHTML)
			setTimeout(() => this.fetchData(), 500)
		}
		return this.element
	}
}
