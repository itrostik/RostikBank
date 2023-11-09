import ChildComponent from '@/core/component/child.component'
import { $R } from '@/core/rquery/rquery.lib'
import renderService from '@/core/services/render.service'

import styles from './search.module.scss'
import template from './search.template.html'
import { UserService } from '@/api/user.service'
import { UserItem } from '@/components/ui/user-item/user-item.component'
import { debounce } from '@/utils/debounce.util'
import { TRANSFER_FIELD_SELECTOR } from '@/components/screens/home/contacts/transfer-field/transfer-field.component'
import { formatCardNumberWithDashes } from '@/utils/format/format-card-number'

export class Search extends ChildComponent {
	constructor() {
		super()
		this.userService = new UserService()
	}
	async #handleSearch(event) {
		const searchTerm = event.target.value
		const searchResultElement = $R(this.element).find('#search-results')
		if (!searchTerm) {
			searchResultElement.html('')
			searchResultElement.removeClass(styles.visible)
			return
		}
		await this.userService.getAll(searchTerm, users => {
			searchResultElement.html('')
			searchResultElement.removeClass(styles.visible)
			users.forEach((user, index) => {
				const userItem = new UserItem(user, true, () => {
					$R(TRANSFER_FIELD_SELECTOR).value(
						formatCardNumberWithDashes(user.card.number)
					)
					searchResultElement.html('')
					searchResultElement.removeClass(styles.visible)
				}).render()
				$R(userItem)
					.addClass(styles.item)
					.css('transition-delay', `${index * 0.1}s`)
				searchResultElement.append(userItem)
				searchResultElement.addClass(styles.visible)
				setTimeout(() => {
					$R(userItem).addClass(styles.visible)
				}, 50)
			})
		})
	}
	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		const debouncedHandleSearch = debounce(
			event => this.#handleSearch(event),
			300
		)
		$R(this.element)
			.find('input')
			.input({
				type: 'search',
				name: 'search',
				placeholder: 'Поиск контактов...'
			})
			.on('input', debouncedHandleSearch)

		return this.element
	}
}
