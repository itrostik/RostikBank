import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import styles from './card-info.module.scss'
import template from './card-info.template.html'
import { CardService } from '@/api/card.service'
import { Store } from '@/core/store/store'
import { $R } from '@/core/rquery/rquery.lib'
import {
	formatCardNumber,
	formatCardNumberWithDashes
} from '@/utils/format/format-card-number'
import { formatToCurrency } from '@/utils/format/format-to-currency'
import { BALANCE_UPDATED } from '@/constants/event.constants'
import { Loader } from '@/components/ui/loader/loader.component'

const CODE = '*****'

export class CardInfo extends ChildComponent {
	constructor() {
		super()
		this.store = Store.getInstance()
		this.cardService = new CardService()
		this.element = renderService.htmlToElement(template, [], styles)
		this.#addListener()
	}
	#addListener() {
		document.addEventListener(BALANCE_UPDATED, () => {
			this.#onBalanceUpdated()
		})
	}
	#removeListener() {
		document.removeEventListener(BALANCE_UPDATED, () => {
			this.#onBalanceUpdated()
		})
	}
	destroy() {
		this.#removeListener()
	}
	#onBalanceUpdated() {
		this.fetchData()
	}
	#copyCardNumber(e) {
		navigator.clipboard.writeText(e.target.innerText).then(() => {
			e.target.innerText = 'Номер карты скопирован!'
			setTimeout(() => {
				e.target.innerText = formatCardNumber(this.card.number)
			}, 2000)
		})
	}

	#toggleCvc(cardCvcElement) {
		const text = cardCvcElement.text()
		text === CODE
			? cardCvcElement.text(this.card.cvc)
			: cardCvcElement.text(CODE)
	}
	fillElements() {
		$R(this.element).html(
			renderService.htmlToElement(template, [], styles).innerHTML
		)
		$R(this.element)
			.find('#card-number__value')
			.text(formatCardNumber(this.card.number))
			.click(event => this.#copyCardNumber(event))
		$R(this.element).find('#card-expireDate__value').text(this.card.expireDate)
		const cardCvcElement = $R(this.element).find('#card-cvc__value')
		cardCvcElement.text(CODE).css('width', '40px')
		$R(this.element)
			.find('#toggle-cvc')
			.click(() => this.#toggleCvc(cardCvcElement))
		$R(this.element)
			.find('#card-balance__value')
			.text(formatToCurrency(this.card.balance))
	}
	fetchData() {
		this.cardService.byUser(data => {
			if (data?.id) {
				this.card = data
				this.fillElements()
				this.store.updateCard(data)
			} else {
				this.store.updateCard(null)
			}
		})
	}

	render() {
		if (this.store.state.user) {
			$R(this.element).html(new Loader().render().outerHTML)
			setTimeout(() => this.fetchData(), 500)
		}
		return this.element
	}
}
