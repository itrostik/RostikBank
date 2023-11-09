import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import styles from './transactions.module.scss'
import template from './transactions.template.html'
import { Store } from '@/core/store/store'
import { $R } from '@/core/rquery/rquery.lib'
import { TRANSACTION_COMPLETED } from '@/constants/event.constants'
import { Heading } from '@/components/ui/heading/heading.component'
import {
	Loader,
	LOADER_SELECTOR
} from '@/components/ui/loader/loader.component'

import { TransactionService } from '@/api/transaction.service'
import { TransactionItem } from '@/components/screens/home/transactions/transaction-item/transaction-item.component'

export class Transactions extends ChildComponent {
	constructor() {
		super()
		this.store = Store.getInstance().state
		this.transactionService = new TransactionService()
		this.element = renderService.htmlToElement(
			template,
			[new Heading('Последние транзакции')],
			styles
		)
		this.#addListener()
	}
	#addListener() {
		document.addEventListener(TRANSACTION_COMPLETED, () => {
			this.#onTransactionUpdated()
		})
	}
	#removeListener() {
		document.removeEventListener(TRANSACTION_COMPLETED, () => {
			this.#onTransactionUpdated()
		})
	}
	#onTransactionUpdated() {
		this.fetchData()
	}
	destroy() {
		this.#removeListener()
	}
	fetchData() {
		const transactionsList = $R(this.element).find('#transactions-list')
		transactionsList.css('display', 'none')
		this.transactionService.getAll(data => {
			if (!data) return
			const loadedElement = this.element.querySelector(LOADER_SELECTOR)
			if (loadedElement) loadedElement.remove()
			const transactionsList = $R(this.element).find('#transactions-list')
			transactionsList.text('')
			if (data.length) {
				transactionsList.css('display', 'flex')
				for (const transaction of data.transactions) {
					transactionsList.append(new TransactionItem(transaction).render())
				}
			} else {
				transactionsList.text('Транзакций не найдено!')
			}
		})
	}
	render() {
		if (this.store.user) {
			$R(this.element).append(new Loader().render())
			setTimeout(() => this.fetchData(), 500)
		}
		return this.element
	}
}
