import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import styles from './statistic-item.module.scss'
import template from './statistic-item.template.html'
import { $R } from '@/core/rquery/rquery.lib'

export class StatisticItem extends ChildComponent {
	constructor(label, value, variant) {
		super()
		if (!label || !value || !variant)
			throw new Error('Label, value and variant required')
		this.label = label
		this.value = value
		this.variant = variant
	}
	render() {
		this.element = renderService.htmlToElement(template, [], styles)
		$R(this.element).addClass(styles[this.variant])
		$R(this.element).find('#statistic-label').text(this.label)
		$R(this.element).find('#statistic-value').text(this.value)
		return this.element
	}
}
