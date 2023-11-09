import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import styles from './statistics.module.scss'
import template from './statistics.template.html'
import { StatisticService } from '@/api/statistic.service'
import { Store } from '@/core/store/store'
import { Heading } from '@/components/ui/heading/heading.component'
import { TRANSACTION_COMPLETED } from '@/constants/event.constants'
import {
	Loader,
	LOADER_SELECTOR
} from '@/components/ui/loader/loader.component'
import { $R } from '@/core/rquery/rquery.lib'
import { TransactionItem } from '@/components/screens/home/transactions/transaction-item/transaction-item.component'
import { StatisticItem } from '@/components/screens/statistics/statistic-item/statistic-item.component'
import { formatToCurrency } from '@/utils/format/format-to-currency'
import { CircleChart } from '@/components/screens/statistics/circle-chart/circle-chart.component'

export class Statistics extends ChildComponent {
	constructor() {
		super()
		this.store = Store.getInstance().state
		this.statisticService = new StatisticService()
		this.element = renderService.htmlToElement(
			template,
			[new Heading('Статистика')],
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
	renderChart(income, expense) {
		const total = income + expense
		let incomePercent = (income * 100) / total
		let expensePercent = 100 - incomePercent
		if (income && !expense) {
			incomePercent = 100
			expensePercent = 0.1
		}
		if (!income && expense) {
			incomePercent = 0.1
			expensePercent = 100
		}
		return new CircleChart(incomePercent, expensePercent).render()
	}
	fetchData() {
		this.statisticService.main(data => {
			if (!data) return
			const loadedElement = this.element.querySelector(LOADER_SELECTOR)
			if (loadedElement) loadedElement.remove()
			const statisticsList = $R(this.element).find('#statistics-items')
			const circleChartElement = $R(this.element).find('#circle-chart')
			circleChartElement.text('')
			statisticsList.text('')
			statisticsList
				.append(
					new StatisticItem(
						'Доходы: ',
						formatToCurrency(data[0].value),
						'white'
					).render()
				)
				.append(
					new StatisticItem(
						'Затраты: ',
						formatToCurrency(data[1].value),
						'black'
					).render()
				)
			circleChartElement.append(this.renderChart(data[0].value, data[1].value))
		})
	}
	render() {
		this.element = renderService.htmlToElement(
			template,
			[new Heading('Статистика')],
			styles
		)
		if (this.store.user) {
			$R(this.element).append(new Loader().render())
			setTimeout(() => this.fetchData(), 500)
		}
		return this.element
	}
}
