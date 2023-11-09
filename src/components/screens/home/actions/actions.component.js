import ChildComponent from '@/core/component/child.component'
import { Store } from '@/core/store/store'
import { CardService } from '@/api/card.service'
import { NotificationService } from '@/core/services/notification.service'
import renderService from '@/core/services/render.service'
import styles from './actions.module.scss'
import template from './actions.template.html'
import { Field } from '@/components/ui/field/field.component'
import { Button } from '@/components/ui/button/button.component'
import { $R } from '@/core/rquery/rquery.lib'
import validationService from '@/core/services/validation.service'
import { BALANCE_UPDATED } from '@/constants/event.constants'
export class Actions extends ChildComponent {
	constructor() {
		super()
		this.store = Store.getInstance().state
		this.cardService = new CardService()
		this.notificationService = new NotificationService()
	}

	updateBalance(event, type) {
		event.preventDefault()
		if (!this.store.user) {
			this.notificationService.show('error', 'Вы должны быть авторизованы!')
		}
		$R(event.target).text('Обработка...').attr('disabled')
		const inputElement = $R(this.element).find('input')
		const amount = inputElement.value()
		if (!amount || (amount.length > 6 && amount !== '1000000')) {
			validationService.showError($R(this.element).find('input'))
			this.notificationService.show('error', 'Введите число от 1 до 1 млн!')
			if (type === 'top-up')
				$R(event.target).removeAttr('disabled').text('Пополнить')
			if (type === 'withdrawal')
				$R(event.target).removeAttr('disabled').text('Снять')
			return
		}
		this.cardService.updateBalance(amount, type, () => {
			inputElement.value('')
			const balanceUpdatedEvent = new Event(BALANCE_UPDATED)
			document.dispatchEvent(balanceUpdatedEvent)
		})
		if (type === 'top-up')
			$R(event.target).removeAttr('disabled').text('Пополнить')
		if (type === 'withdrawal')
			$R(event.target).removeAttr('disabled').text('Снять')
	}
	render() {
		this.element = renderService.htmlToElement(
			template,
			[
				new Field({
					name: 'amount',
					placeholder: 'Введите сумму:',
					type: 'number'
				})
			],
			styles
		)
		$R(this.element)
			.find('#action-buttons')
			.append(
				new Button({
					children: 'Пополнить',
					variant: 'white',
					onClick: e => this.updateBalance(e, 'top-up')
				}).render()
			)
			.append(
				new Button({
					children: 'Cнять',
					variant: 'gray',
					onClick: e => this.updateBalance(e, 'withdrawal')
				}).render()
			)
		return this.element
	}
}
