import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import styles from './circle-chart.module.scss'
import template from './circle-chart.template.html'
import { $R } from '@/core/rquery/rquery.lib'
import { DonatChart } from '@/components/ui/donat-chart/donat-chart.component'

export class CircleChart extends ChildComponent {
	constructor(incomePercent, expensePercent) {
		super()
		this.incomePercent = incomePercent
		this.expensePercent = expensePercent
	}

	render() {
		this.element = renderService.htmlToElement(
			template,
			[
				new DonatChart([
					{
						value: this.incomePercent,
						color: '#ffffff'
					},
					{
						value: this.expensePercent,
						color: '#000000'
					}
				])
			],
			styles
		)
		return this.element
	}
}
