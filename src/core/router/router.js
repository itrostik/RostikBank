import { RoutesData } from '@/core/router/routes.data'
import { NotFound } from '@/components/screens/not-found/not-found.component'
import { Layout } from '@/components/layout/layout.component'
import { $R } from '@/core/rquery/rquery.lib'

export class Router {
  #routes = RoutesData
  #currentRoute = null
  #layout = null

  constructor() {
    window.addEventListener('popstate', () => {
      this.#handleRouteChange()
    })
    this.#handleRouteChange()
    this.#handleLinks()
  }

  getCurrentPath() {
    return window.location.pathname
  }

  #handleRouteChange() {
    const path = this.getCurrentPath() || '/'
    let route = this.#routes.find(route => route.path === path)
    if (!route) {
      route = {
        component: NotFound
      }
    }
    this.#currentRoute = route
    this.#render()
  }

  #handleLinks() {
    document.addEventListener('click', event => {
      const target = event.target.closest('a')
      if (target) {
        event.preventDefault()
        this.navigate(target.href)
      }
    })
  }

  navigate(path) {
    if (path !== this.getCurrentPath()) {
      window.history.pushState({}, '', path)
      this.#handleRouteChange()
    }
  }

  #render() {
    const component = new this.#currentRoute.component().render()
    if (!this.#layout) {
      this.#layout = new Layout({
        router: this,
        children: component
      }).render()
      $R('#app').append(this.#layout)
    } else {
      $R('#content').html('').append(component)
    }
  }
}
