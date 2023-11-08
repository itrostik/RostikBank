import renderService from '@/core/services/render.service'
import styles from '@/components/layout/notification/notification.module.scss'
import { $R } from '@/core/rquery/rquery.lib'

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
    const notificationModal = $R('#notification')
    const className = classNames[type]
    notificationModal.text(message).addClass(className)
    this.#timeout(() => {
      notificationModal.removeClass(className)
    }, 3000)
  }
}

export default new NotificationService()
