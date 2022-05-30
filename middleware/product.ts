import { Middleware } from '@nuxt/types'

/** Updates productCategory when this middleware is attached */
const productMiddleware: Middleware = function ({ store }) {
  // Update product categories
  store.dispatch('market/fetchCategories')
  // Update product tags
  store.dispatch('market/fetchTags')
}

export default productMiddleware
