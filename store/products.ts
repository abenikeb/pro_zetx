import path from 'path'
import _ from 'lodash'

import { NuxtFireInstance } from '@nuxtjs/firebase'
// eslint-disable-next-line import/named
import { Store, ActionTree, MutationTree } from 'vuex'
/** Type Definitions */
import {
  ProductType,
  ProductSellerState,
  ProductNotFound,
  PRODUCTS_COLLECTION,
  Product,
} from '~/plugins/model/products.model'
import {
  OrderNotification,
  OrderReceiverType,
  OrderStatusState,
  OrderType,
  ORDER_COLLECTION,
  OrderType as Order,
} from '~/plugins/model/order.model'
import { UserNotLoggedIn } from '~/plugins/model/utils.model'
import {
  FilterProductsBy,
  ProductPriceFilter,
} from '~/plugins/model/marketplace.model'

/** Used to log error messages to the browser, can easily identify the marketplace logs */

const logErrorMsg = (title: string, messages?: any) => {
  // eslint-disable-next-line no-console
  console.error('[Products]', title, messages)
  if (messages?.err) throw messages?.err
}

/**
  A state should be a function that returns an object. - is an warning message that lead me to this.
  @see {@link https://nuxtjs.org/docs/directory-structure/store/#modules|Vuex Store Modules} Defining store modules.
 */
export const state = (): ProductSellerState => ({
  products: {
    products: [],
  },
  orders: {
    orders: [],
    orderNotifications: [],
  },
})

export const mutations: MutationTree<ProductSellerState> = {
  UPDATE_ALL_PRODUCTS: (state, payload: { products: Array<ProductType> }) =>
    (state.products.products = payload.products),
  UPDATE_PRODUCT: (state, payload: { product: ProductType }) =>
    (state.products.products = _.map(
      state.products.products,
      (product: ProductType) =>
        product.id === payload.product.id ? payload.product : product
    )),
  /** Remove product, when deleting product */
  REMOVE_PRODUCT: (state, payload: { productId: string }) =>
    (state.products.products = _.reject(
      state.products.products,
      (product: ProductType) => product.id === payload.productId
    )),

  // Order Related
  UPDATE_ALL_ORDERS: (state, payload: { orders: Array<OrderType> }) => {
    state.orders.orders = payload.orders
  },
  UPDATE_ORDER: (state, payload: { order: OrderType }) => {
    // FIXME more efficient way to do this maybe
    state.orders.orders = _.map(state.orders.orders, (order: OrderType) =>
      order.id === payload.order.id ? payload.order : order
    )
  },
  UPDATE_ALL_ORDER_NOTIFICATIONS: (
    state,
    payload: { notifications: Array<OrderNotification> }
  ) => {
    state.orders.orderNotifications = payload.notifications
  },
}

export const actions: ActionTree<ProductSellerState, Store<any>> = {
  /** Create Product */
  async createProduct({ dispatch }, payload: { product: ProductType }) {
    // New product has no "product id", removing the id
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const product = new Product(payload.product)

    try {
      const currentUser = this.$fire.auth.currentUser
      if (!currentUser) throw new UserNotLoggedIn()

      // Set seller to the product.
      product.sellerId = currentUser.uid

      await this.$fire.firestore.collection('products').add(product.toJSON!())
    } catch (err) {
      logErrorMsg('Fetching Products failed', {
        err,
      })
    }

    // Load products from firebase
    dispatch('getProducts')
  },

  async getProduct({ state, dispatch }, payload: { productId: string }) {
    await dispatch('fetchAllProducts')

    try {
      return _.find(
        state.products.products,
        (product: ProductType) => product.id === payload.productId
      )
    } catch (err) {
      logErrorMsg('Fetching product failed', {
        err,
      })
    }
  },

  async updateProduct({ commit }, payload: { product: ProductType }) {
    try {
      const currentUser = this.$fire.auth.currentUser

      if (!currentUser) throw new UserNotLoggedIn()

      const { id, ...updatedProduct } = payload.product

      const productCollection = this.$fire.firestore.collection('products')
      await productCollection.doc(id).update(updatedProduct)

      commit('UPDATE_PRODUCT', { product: payload.product })
    } catch (err) {
      logErrorMsg('Updating product information failed', {
        err,
      })
    }
  },

  /* Update Existing Product */
  async fetchAllProducts({ commit }) {
    try {
      const currentUser = this.$fire.auth.currentUser

      if (!currentUser) throw new UserNotLoggedIn()

      const productsIterator = await this.$fire.firestore
        .collection('products')
        .where('sellerId', '==', currentUser.uid)
        .get()
      const products = [] as Array<ProductType>

      productsIterator.forEach((doc) =>
        products.push({ id: doc.id, ...doc.data() } as ProductType)
      )

      commit('UPDATE_ALL_PRODUCTS', { products })
    } catch (err) {
      logErrorMsg('Fetching all products', {
        err,
      })
    }
  },

  /**
   * Search for products using a keyword, updates store
   * when relevant product(s) are fetched.
   *
   * @param _context Search for products from the store.
   * @param keyword Product keyword used for searching
   */
  async searchedProducts({ commit }, keyword: string) {
    const firestore = (this.$fire as NuxtFireInstance).firestore
    try {
      const productSnapshot = await firestore
        .collection('products')
        .where('name', '==', keyword)
        .get()
      const products = [] as Array<ProductType>
      productSnapshot.forEach((product) =>
        products.push({ id: product.id, ...product.data() } as ProductType)
      )
      commit('UPDATE_ALL_PRODUCTS', { products })
    } catch {
      // eslint-disable-next-line no-console
      console.error(
        `Error searching for products ${path.join(__dirname, __filename)}`
      )
    }
  },

  /**
   * Filter products by category and populates store.
   *
   * @param _context Firebase Context
   * @param productCategory Product category keyword
   */
  async filteredByCategory({ commit }, payload: { productCategory: string }) {
    const firestore = (this.$fire as NuxtFireInstance).firestore
    const products = [] as Array<ProductType>

    try {
      /** filter the snapshot based on category */
      const filteredProducts = await firestore
        .collection('products')
        .where('category', '==', payload.productCategory)
        .get()

      // Appending prodcuts
      filteredProducts.forEach((p) =>
        products.push({ id: p.id, ...p.data() } as ProductType)
      )

      // Persist changes on the state
      commit('UPDATE_ALL_PRODUCTS', { products })
    } catch {
      // eslint-disable-next-line no-console
      console.error(
        `Error Filtering Products: ${path.join(__dirname, __filename)}`
      )
    }
  },

  async filterProducts(
    { commit, dispatch, state },
    payload: {
      by: FilterProductsBy
      where: string | ProductPriceFilter
    }
  ) {
    try {
      const currentUser = this.$fire.auth.currentUser

      if (!currentUser) throw new UserNotLoggedIn()

      switch (payload.by) {
        case FilterProductsBy.Category: {
          // Filter products by category
          await dispatch('fetchAllProducts')
          const products = _.filter(
            state.products.products,
            (product: ProductType) => product.category === payload.where
          )

          commit('UPDATE_ALL_PRODUCTS', { products })

          break
        }
        case FilterProductsBy.Price:
          {
            // Filtering products without using ProductFilterType fails
            if (
              !Object.values(ProductPriceFilter as object).includes(
                payload.where
              )
            )
              throw new Error(
                'Products should be filterd using the "ProductPriceFilter" type.'
              )

            // Final products pool
            const products: Array<ProductType> = []
            // Products reference
            // for filtering all products of the user
            const productsReference = this.$fire.firestore
              .collection(PRODUCTS_COLLECTION)
              .where('sellerId', '==', currentUser.uid)

            switch (payload.where) {
              case ProductPriceFilter.To50: {
                const productsIterator = await productsReference
                  .where('price', '<', 50)
                  .get()

                // Adding products to the final products array
                productsIterator.forEach((product) =>
                  products.push({
                    id: product.id,
                    ...product.data(),
                  } as ProductType)
                )
                break
              }
              case ProductPriceFilter.From50To100: {
                // Filter all products between [50, 100)
                const productsIterator = await productsReference
                  .where('price', '>=', 50)
                  .where('price', '<', 100)
                  .get()

                productsIterator.forEach((product) =>
                  products.push({
                    id: product.id,
                    ...product.data(),
                  } as ProductType)
                )

                break
              }
              case ProductPriceFilter.From100: {
                const productsIterator = await productsReference
                  .where('price', '>=', 100)
                  .get()

                productsIterator.forEach((product) =>
                  products.push({
                    id: product.id,
                    ...product.data(),
                  } as ProductType)
                )

                break
              }
            } // End Switch (where: ProductPriceFilter)

            // Commit filtered products to state
            commit('UPDATE_ALL_PRODUCTS', { products })
          }

          break
      } // End Switch (Payload.by)
    } catch (err) {
      logErrorMsg('Filtering products failed', {
        err,
      })
    }
  },

  /**
   *
   * @param _context Action Context
   * @param productId Product Id to remove
   */
  async deleteProduct(
    { dispatch, state, commit },
    payload: { productId: string }
  ) {
    dispatch('fetchAllProducts')

    try {
      // Get product from local store if exists
      const product = _.find(
        state.products.products,
        (product: ProductType) => product.id === payload.productId
      )

      if (!product) throw new ProductNotFound()

      // Get product from firebase, cloud firestore
      const productSnapshot = this.$fire.firestore
        .collection(PRODUCTS_COLLECTION)
        .doc(product.id)

      // Check if product exists before removing product.
      if (!productSnapshot) throw new ProductNotFound()

      // Deleting Product
      await productSnapshot.delete()
      commit('REMOVE_PRODUCT', { productId: product.id })
    } catch (err) {
      logErrorMsg('Error Removing Product', {
        err,
      })
    }
  },

  async fetchAllOrders({ commit }) {
    try {
      const currentUser = this.$fire.auth.currentUser

      if (!currentUser) throw new UserNotLoggedIn()

      const ordersCollection = await this.$fire.firestore
        .collection(ORDER_COLLECTION)
        .where('sellerId', '==', currentUser.uid)
        .get()

      const orders = [] as Array<OrderType>

      ordersCollection.forEach((order) =>
        orders.push(
          new OrderType({ id: order.id, ...order.data() } as OrderType)
        )
      )

      commit('UPDATE_ALL_ORDERS', { orders })
    } catch (err) {
      logErrorMsg('Fetch all seller orders', {
        err,
      })
    }
  },

  async getOrder({ dispatch, state }, payload: { orderId: string }) {
    await dispatch('fetchAllOrders')
    await dispatch('fetchAllOrderNotifications')

    try {
      const currentUser = this.$fire.auth.currentUser
      if (!currentUser) throw new UserNotLoggedIn()

      /** Updating order notifications to read, since the order is already read. */
      const orderNotifications: Array<OrderNotification> = _.filter(
        state.orders.orderNotifications,
        (orderNotification: OrderNotification) =>
          orderNotification.orderId === payload.orderId
      )

      // Set all notifications related to this order to 'read'
      // since the user opened the order
      orderNotifications.forEach(async (notification: OrderNotification) => {
        if (!notification.isRead) notification.isRead = true

        const notificationSnapshot = this.$fire.firestore
          .collection('notifications')
          .doc(notification.id)

        if (!notificationSnapshot)
          throw new Error('Order notification does not exist in firebase')

        await notificationSnapshot.set({ ...notification })
      })

      await dispatch('fetchAllOrderNotifications')

      const filteredOrder = _.find(
        state.orders.orders,
        (order: OrderType) => order.id === payload.orderId
      )

      if (!filteredOrder) throw new Error("Order doesn't exist")

      return new OrderType(filteredOrder)
    } catch (err) {
      logErrorMsg(`Getting seller order failed, orderId: ${payload.orderId}`, {
        err,
      })
    }
  },

  async updateOrder(
    { commit, dispatch, state },
    payload: { orderId: string; orderState: OrderStatusState }
  ) {
    await dispatch('fetchAllOrders')

    try {
      const orderSnapshot = this.$fire.firestore
        .collection(ORDER_COLLECTION)
        .doc(payload.orderId)

      const notificationCollection =
        this.$fire.firestore.collection('notifications')

      const orders = _.map(state.orders.orders, async (order: OrderType) => {
        if (order.id !== payload.orderId) return order

        const { ...updatedOrder } = new Order({
          ...order,
          status: payload.orderState,
        } as OrderType)

        // Updating
        await orderSnapshot.set(updatedOrder)

        // Extracting buyer notification,
        // because 'variable id' is already declared,
        // can't re-declare a const id variable again.
        const buyerNotification = (() => {
          if (!order.buyerId)
            throw new Error("Order doesn't have a buyer, or buyer id.")
          if (!order.id) throw new Error("Order id doesn't exist.")

          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { id, ...buyerNotification } = new OrderNotification({
            message: `Your ${order.product.product.name}[${order.id}] order status has changed, from status: ${order.status}`,
            orderId: order.id,
            userId: order.buyerId,
            receiverType: OrderReceiverType.BUYER,
          })

          return buyerNotification
        })()

        await notificationCollection.add({ ...buyerNotification })

        // return updatedOrder.toJSON(true) as OrderType
        return updatedOrder as OrderType
      })

      await dispatch('fetchAllOrderNotifications')
      commit('UPDATE_ALL_ORDERS', { orders })
    } catch (err) {
      logErrorMsg(`Update order state failed, orderId: ${payload.orderId}`, {
        err,
      })
    }
  },

  async fetchAllOrderNotifications({ commit }) {
    try {
      const currentUser = this.$fire.auth.currentUser

      if (!currentUser) throw new UserNotLoggedIn()

      const orderNotificationsCollection = await this.$fire.firestore
        .collection('notifications')
        .where('userId', '==', currentUser.uid)
        .where('receiverType', '==', OrderReceiverType.SELLER)
        .where('isRead', '==', false)
        .get()

      const notifications: Array<OrderNotification> = []

      orderNotificationsCollection.forEach((notification) =>
        notifications.push({
          id: notification.id,
          ...notification.data(),
        } as OrderNotification)
      )

      commit('UPDATE_ALL_ORDER_NOTIFICATIONS', { notifications })
    } catch (err) {
      logErrorMsg('Fetching seller order notifications', {
        err,
      })
    }
  },
}
