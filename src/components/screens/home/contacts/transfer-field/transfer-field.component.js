import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import styles from './transfer-field.module.scss'
import template from './transfer-field.template.html'
import { CardService } from '@/api/card.service'
import { Store } from '@/core/store/store'
import { $R } from '@/core/rquery/rquery.lib'
import {
	formatCardNumber,
	formatCardNumberWithDashes
} from '@/utils/format/format-card-number'
import { formatToCurrency } from '@/utils/format/format-to-currency'
import {
	BALANCE_UPDATED,
	TRANSACTION_COMPLETED
} from '@/constants/event.constants'
import { NotificationService } from '@/core/services/notification.service'
import validationService from '@/core/services/validation.service'
import { Field } from '@/components/ui/field/field.component'
import { Button } from '@/components/ui/button/button.component'

export const TRANSFER_FIELD_SELECTOR = '[name="card-number"]'
export class TransferField extends ChildComponent {
	constructor() {
		super()
		this.store = Store.getInstance().state
		this.cardService = new CardService()
		this.notificationService = new NotificationService()
	}
	handleTransfer(event) {
		event.preventDefault()
		if (!this.store.user) {
			this.notificationService.show('error', 'Вы должны авторизоваться!')
		}
		$R(event.target).text('Обработка...').attr('disabled')
		const inputElement = $R(this.element).find('input')
		const toCardNumber = inputElement.value().replaceAll('-', '')
		const reset = () => {
			$R(event.target).removeAttr('disabled').text('Отправить')
		}
		if (!toCardNumber) {
			validationService.showError($R(this.element).find('input'))
			reset()
			return
		}
		let amount = prompt('Сумма перевода (вводи от 1 до 1 млн) 👇')
		console.log(amount)
		if (amount && +amount <= 1_000_000 && +amount > 0) {
			this.cardService.transfer({ amount, toCardNumber }, () => {
				inputElement.value('')
				amount = ''
				document.dispatchEvent(new Event(TRANSACTION_COMPLETED))
				document.dispatchEvent(new Event(BALANCE_UPDATED))
			})
		}
		reset()
	}
	render() {
		this.element = renderService.htmlToElement(
			template,
			[
				new Field({
					name: 'card-number',
					placeholder: 'xxxx-xxxx-xxxx-xxxx',
					variant: 'credit-card'
				}),
				new Button({
					children: 'Отправить',
					variant: 'gray',
					onClick: event => this.handleTransfer(event)
				})
			],
			styles
		)
		return this.element
	}
}
