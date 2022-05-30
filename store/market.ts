import _ from 'lodash'
import firebase from 'firebase'

/** Type Definitions */
import {
  MarketplaceState,
  MarketplaceMutations,
  MarketplaeGetters,
  MarketplaceActions,
  FilterProductsBy,
  ProductPriceFilter,
  UserWalletType,
} from '~/plugins/model/marketplace.model'
import {
  OrderNotification,
  OrderType,
  ORDER_COLLECTION,
  ORDER_NOTIFICATION_COLLECTION,
  OrderPaymentType,
  OrderReceiverType,
  UserType,
} from '~/plugins/model/order.model'
import {
  ProductCategory,
  ProductCollection,
  PRODUCTS_COLLECTION,
  ProductType,
  Product,
  PRODUCT_CATEGORIES_COLLECTION,
  PRODUCT_TAGS_COLLECTION,
  ProductNotFound,
} from '~/plugins/model/products.model'
import { UserNotLoggedIn } from '~/plugins/model/utils.model'

export const state: Function = (): MarketplaceState => ({
  products: {
    productCategories: [],
    productTags: [],
    products: [],
  },
  orders: {
    orderNotifications: [],
    orders: [],
  },
})

/** Used to log error messages to the browser, can easily identify the marketplace logs */
const logErrorMsg = (title: string, messages?: any) => {
  // eslint-disable-next-line no-console
  console.error('[Marketplace]', title, messages)

  if (messages?.err) throw messages?.err
}

export const mutations: MarketplaceMutations = {
  UPDATE_PRODUCTS: (state, payload: { products: Array<ProductType> }) => {
    state.products.products = payload.products
  },

  UPDATE_PRODUCT_TAGS: (state, payload: { tags: Array<string> }) => {
    state.products.productTags = payload.tags
  },

  UPDATE_PRODUCT_CATEGORIES: (
    state,
    payload: { categories: Array<ProductCategory> }
  ) => {
    state.products.productCategories = payload.categories
  },

  UPDATE_ORDERS: (state, payload: { orders: Array<OrderType> }) => {
    state.orders.orders = payload.orders
  },

  // TODO: FIXME: fix order notification type
  UPDATE_ORDER_NOTIFICATIONS: (
    state,
    payload: { notifications: Array<any> }
  ) => {
    state.orders.orderNotifications = payload.notifications
  },

  /** Since order is specific to the user, we can append the user data */
  ADD_ORDER: (state, payload: { order: OrderType }) => {
    state.orders.orders?.push(payload.order)
  },
}

export const getters: MarketplaeGetters = {
  /** Count the number of unread notifications */
  getNotificationCount: (state) => {
    return state.orders.orderNotifications?.length
  },
}

export const actions: MarketplaceActions = {
  async fetchAllProducts({ commit }) {
    try {
      const productsIterator = await this.$fire.firestore
        .collection(PRODUCTS_COLLECTION)
        // .where('status', '==', ProductStatus.ACTIVE)
        .get()
      const products: ProductCollection = []

      productsIterator.forEach((product) => {
        products.push({ id: product.id, ...product.data() } as ProductType)
      })

      commit('UPDATE_PRODUCTS', { products })
    } catch (err) {
      logErrorMsg('Marketplace product updating failed: ', { err })
    }
  },

  async getProduct(_context, payload: { productId: string }) {
    try {
      const productSnapshot = await this.$fire.firestore
        .collection(PRODUCTS_COLLECTION)
        .doc(payload.productId)
        .get()

      const product = {
        id: productSnapshot.id,
        ...productSnapshot.data(),
      } as ProductType

      // if (product.status === ProductStatus.INACTIVE)
      //   throw new Error('Product does not exist.')

      return product
    } catch (err) {
      logErrorMsg('fetching product information failed:', { err })
    }
  },

  async createOrder(
    { commit, dispatch },
    payload: { productId: string; quantity: number }
  ) {
    try {
      const productSnapshot = await this.$fire.firestore
        .collection(PRODUCTS_COLLECTION)
        .doc(payload.productId)
        .get()

      if (!productSnapshot) throw new ProductNotFound()

      const product = new Product({
        id: productSnapshot.id,
        ...productSnapshot.data(),
      } as ProductType)

      const currentUser = this.$fire.auth.currentUser
      const orderDate = firebase.firestore.Timestamp.now()

      // Do not allow if user is not logged in
      if (!currentUser) throw new UserNotLoggedIn()

      const seller = await (async () => {
        const sellerRef = await this.$fire.firestore
          .collection('users')
          .doc(product.sellerId)
          .get()
        return { id: sellerRef.id, ...sellerRef.data() } as UserType
      })()

      const buyer = await (async () => {
        const buyerRef = await this.$fire.firestore
          .collection('users')
          .doc(currentUser.uid)
          .get()
        return { id: buyerRef.id, ...buyerRef.data() } as UserType
      })()

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const order = new OrderType({
        product: {
          product: product.toJSON!() as ProductType,
          quantity: payload.quantity,
        },
        paymentType: OrderPaymentType.STRIPE,
        orderNumber: Math.floor(Math.random() * 89999) + 1000,
        buyerId: currentUser.uid,
        buyer,
        orderDate,
        seller,
      } as OrderType)

      const userWalletCapacity = await dispatch('getUserWalletCapacity')

      if (typeof order.price === 'undefined')
        throw new Error(
          "Order price not set, can't make an order without setting order price"
        )

      if (userWalletCapacity < order.price?.carbonReduction)
        throw new Error(
          'Order carbon reduction credit price heigher, to buy user must have more carbon reductions'
        )

      // Dispatch make payments in carbon reduction credit
      await dispatch('processPayment', { order })

      // Create the order
      const orderReference = await this.$fire.firestore
        .collection(ORDER_COLLECTION)
        .add(order.toJSON())

      if (!order.sellerId)
        throw new Error("Can't create a product order without the sellerId")

      // Decrement Product ForSale number
      if (!product.inventory?.forsale)
        throw new Error('Inventory forsale not defined')

      if (product.inventory.forsale <= 0)
        throw new Error(
          'Product forsale inventory is zero, now remaining product for sale.'
        )

      product.inventory.forsale -= order.product.quantity // Deduct from for sale
      product.inventory.sold += order.product.quantity

      // Save product to store
      await productSnapshot.ref.set(product.toJSON!())

      /**
       * Create an order notification to the
       * product seller.
       */
      const orderNotification = new OrderNotification({
        orderId: orderReference.id,
        userId: order.sellerId,
        message: `${buyer.firstName} ${buyer.lastName} has made an order for ${order.product.product.name}`,
        receiverType: OrderReceiverType.SELLER,
      })

      // Save the order notifications collection
      await this.$fire.firestore
        .collection('notifications')
        .add({ ...orderNotification })

      /**
       * After the order is made to the seller
       * append the order to the buyers state
       */
      commit('ADD_ORDER', {
        order: {
          id: orderReference.id,
          ...(await orderReference.get()).data(),
        } as OrderType,
      })
    } catch (err) {
      logErrorMsg('Creating your order failed', { err })
    }
  },

  async fetchAllOrders({ commit }) {
    try {
      const currentUser = this.$fire.auth.currentUser

      if (!currentUser) throw new UserNotLoggedIn()

      const ordersIterator = await this.$fire.firestore
        .collection(ORDER_COLLECTION)
        .where('buyerId', '==', currentUser.uid)
        .get()
      const orders = [] as Array<OrderType>
      ordersIterator.forEach((order) =>
        orders.push(
          new OrderType({ id: order.id, ...order.data() } as OrderType)
        )
      )

      commit('UPDATE_ORDERS', { orders })
    } catch (err) {
      logErrorMsg('fetching your orders failed', { err })
    }
  },

  /**
   * Open a single order information.
   */
  async getOrder({ dispatch, commit, state }, payload: { orderId: string }) {
    // Update orders and order notifications
    await dispatch('fetchAllOrders')
    await dispatch('fetchAllOrderNotifications')

    try {
      // User information
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

      /** Remove the order notification from state */
      commit('UPDATE_ORDER_NOTIFICATIONS', {
        notifications: _.reject(
          state.orders.orderNotifications,
          (notification: OrderNotification) =>
            notification.orderId !== payload.orderId
        ),
      })

      // Return the order
      const filteredOrder = _.find(
        state.orders.orders,
        (order: OrderType) => order.id === payload.orderId
      )

      if (!filteredOrder) throw new Error("Order doesn't exist.")

      return new OrderType(filteredOrder)
    } catch (err) {
      logErrorMsg('Cannot getting order failed,', {
        orderId: payload.orderId,
        err,
      })
    }
  },

  /**
   * updates all categories from firebase.
   */
  async fetchCategories({ commit }) {
    try {
      const categoriesIterator = await this.$fire.firestore
        .collection(PRODUCT_CATEGORIES_COLLECTION)
        .get()

      const categories: Array<ProductCategory> = []

      categoriesIterator.forEach((category) =>
        categories.push({ ...category.data() } as ProductCategory)
      )

      commit('UPDATE_PRODUCT_CATEGORIES', { categories })
    } catch (err) {
      logErrorMsg('Fetching product categories failed', {
        err,
      })
    }
  },

  /** Update all product tags from firebase */
  async fetchTags({ commit }) {
    try {
      const tagsIterator = await this.$fire.firestore
        .collection(PRODUCT_TAGS_COLLECTION)
        .get()
      const tags: Array<string> = []

      tagsIterator.forEach((tag) => tags.push(tag.data().name as string))

      commit('UPDATE_PRODUCT_TAGS', { tags })
    } catch (err) {
      logErrorMsg('Fetching product tags failed', { err })
    }
  },

  async addTags({ dispatch }, payload: { tags: Array<string> }) {
    try {
      // Firebase Collection
      const productTagsCollection = this.$fire.firestore.collection(
        PRODUCT_TAGS_COLLECTION
      )

      // Fetch the tags from firebase
      const prevTags: Array<string> = []
      const productTagsFetched = await productTagsCollection.get()
      productTagsFetched.forEach((tag) => prevTags.push(tag.id))

      // Only select the tags that don't exist
      const newTags = _.difference(prevTags, payload.tags)

      // Add all the tags to firebase
      for (const tag in newTags) {
        await productTagsCollection.doc(tag).set({ name: tag })
      }

      // Update tags from firebase
      await dispatch('fetchTags')
    } catch (err) {
      logErrorMsg('Adding tags failed', {
        err,
      })
    }
  },

  async getUserWalletCapacity() {
    try {
      const currentUser = this.$fire.auth.currentUser
      if (!currentUser) throw new UserNotLoggedIn()

      /**
       * Get the  the user wallet.
       * Ideally, there should only be one.
       * (First Result of the List, Firebase Limitation)
       */
      const userWallet = (
        await this.$fire.firestore
          .collection('wallet')
          .where('userId', '==', currentUser.uid)
          .get()
      ).docs[0]

      // Return only the carbonCreditBalance
      // return userWallet.data().carbonCreditBalance
      return userWallet.data().carbonCreditBalance
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Fetching user carbon credit amount failed', {
        err,
      })
    }
  },

  async processPayment(_context, payload: { order: OrderType }) {
    const order = payload.order

    try {
      const currentUser = this.$fire.auth.currentUser
      if (!currentUser) throw new UserNotLoggedIn()

      const userWalletRef = (
        await this.$fire.firestore
          .collection('wallet')
          .where('userId', '==', currentUser.uid)
          .get()
      ).docs[0]

      if (!userWalletRef.exists) throw new Error("Buyer wallet doesn't exist.")

      const sellerRef = await this.$fire.firestore
        .collection('users')
        .doc(payload.order.sellerId)
        .get()

      if (!sellerRef.exists) throw new Error("Seller doesn't exist")

      const sellerWalletRef = (
        await this.$fire.firestore
          .collection('wallet')
          .where('userId', '==', sellerRef.id)
          .get()
      ).docs[0]

      if (!sellerWalletRef.exists)
        throw new Error("Seller wallet doesn't exist")

      if (typeof order.price === 'undefined')
        throw new Error('Product price not provided by the order')

      if (typeof order.price?.carbonReduction === 'undefined')
        throw new Error('Carbon reduction not provided by the order')

      // Update buyer wallet when making an order, deduct order price from buyer
      await userWalletRef.ref.update({
        ...userWalletRef.data(),
        userId: userWalletRef.data().userId,
        carbonCreditBalance:
          userWalletRef.data().carbonCreditBalance -
          payload.order?.getActualCarbonReuctionPrice(),
      } as UserWalletType)

      if (typeof payload.order.price === 'undefined')
        throw new Error('Order required price')
      if (typeof payload.order.price.carbonReduction === 'undefined')
        throw new Error('Order Carbon reduction is required')

      // Update seller wallet when making an order, add order price to seller
      await sellerWalletRef.ref.update({
        ...sellerWalletRef.data(),
        userId: sellerWalletRef.data().userId,
        carbonCreditBalance:
          sellerWalletRef.data().carbonCreditBalance +
          payload.order.price.carbonReduction,
      } as UserWalletType)
    } catch (err) {
      logErrorMsg('Processing payment failed', {
        err,
      })
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
      switch (payload.by) {
        case FilterProductsBy.Category: {
          await dispatch('fetchAllProducts')

          // Filter products by category
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
            const productsReference =
              this.$fire.firestore.collection(PRODUCTS_COLLECTION)

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
            } // End Switch

            // Commit filtered products to state
            commit('UPDATE_ALL_PRODUCTS', { products })
          }

          break
      } // End Switch
    } catch (err) {
      logErrorMsg('Filtering products failed', {
        err,
      })
    }
  },

  async searchProduct(
    { dispatch, state, commit },
    payload: { keyword: string }
  ) {
    // First fetch all products
    await dispatch('fetchAllProducts')

    try {
      /** Filtered Products by search keyword */
      const products = _.filter(
        state.products.products,
        (product: ProductType) =>
          product.name.includes(payload.keyword) ||
          product.description?.includes(payload.keyword)
      )

      commit('UPDATE_PRODUCTS', { products })
    } catch (err) {
      logErrorMsg('error ocurred when searching for product', { err })
    }
  },

  async fetchAllOrderNotifications({ commit }) {
    try {
      const currentUser = this.$fire.auth.currentUser

      if (!currentUser) throw new Error('User not logged in')

      const notificationIterators = await this.$fire.firestore
        .collection('notifications')
        .where('userId', '==', currentUser.uid)
        .where('type', '==', ORDER_NOTIFICATION_COLLECTION)
        .where('receiverType', '==', OrderReceiverType.BUYER)
        .where('isRead', '==', false)
        .get()
      const notifications: Array<OrderNotification> = []

      notificationIterators.forEach((notification) =>
        notifications.push({
          id: notification.id,
          ...notification.data(),
        } as OrderNotification)
      )

      commit('UPDATE_ORDER_NOTIFICATIONS', { notifications })
      // dispatch('notifications/addNotification', { notifications })
    } catch (err) {
      logErrorMsg('Updating order notifications failed', { err })
    }
  },
}
