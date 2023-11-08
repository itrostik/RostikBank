import styles from '@/components/layout/notification/notification.module.scss'

import { $R } from '../rquery/rquery.lib'

/**
 * NotificationService is a utility class to handle displaying notifications.
 * It can be used to display messages with different types (success, error) and manage the notification timeout.
 */
export class NotificationService {
	#timeout

	constructor() {
		this.#timeout = null
	}

	#setTimeout(callback, duration) {
		if (this.#timeout) {
			clearTimeout(this.#timeout)
		}
		this.#timeout = setTimeout(callback, duration)
	}

	show(type, message) {
		if (!['success', 'error'].includes(type)) {
			throw new Error(
				'Invalid notification type. Allowed types are "success" and "error".'
			)
		}

		const classNames = {
			success: styles.success,
			error: styles.error
		}

		const notificationElement = $R('#notification')
		const className = classNames[type]

		notificationElement.text(message).addClass(className)

		this.#setTimeout(() => {
			notificationElement.removeClass(className)
		}, 3000)
	}
}
