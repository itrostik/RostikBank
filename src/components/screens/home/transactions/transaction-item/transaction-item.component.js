import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import styles from './transaction-item.module.scss'
import template from './transaction-item.template.html'
import { $R } from '@/core/rquery/rquery.lib'
import { formatToCurrency } from '@/utils/format/format-to-currency'
import { formatDate } from '@/utils/format/format-to-date'

export class TransactionItem extends ChildComponent {
	constructor(transaction) {
		super()
		this.transaction = transaction
	}
	render() {
		this.element = renderService.htmlToElement(template, [], styles)
		const isIncome = this.transaction.type === 'TOP_UP'
		const name = isIncome ? 'Получение' : 'Отправка'
		if (isIncome) $R(this.element).addClass(styles.income)
		$R(this.element).find('#transaction-name').text(name)
		$R(this.element)
			.find('#transaction-date')
			.text(formatDate(this.transaction.createdAt))
		$R(this.element)
			.find('#transaction-amount')
			.text(formatToCurrency(this.transaction.amount))
		return this.element
	}
}
