// eslint-disable-next-line import/named
import { MutationTree, GetterTree, ActionTree, Store } from 'vuex'

import { OrderState } from './order.model'
import { ProductState } from './products.model'

export enum FilterProductsBy {
  Category = 'category',
  Price = 'price',
}

export enum ProductPriceFilter {
  To50 = 'filter_upto_50',
  From50To100 = 'filter_from_50_to_100',
  From100 = 'filter_from_100',
}

export interface MarketplaceState {
  orders: OrderState
  products: ProductState
}

export type MarketplaceMutations = MutationTree<MarketplaceState>
export type MarketplaeGetters = GetterTree<MarketplaceState, Store<any>>
export type MarketplaceActions = ActionTree<MarketplaceState, Store<any>>

export type UserWalletType = {
  carbonCreditBalance: number
  moneyBalance?: number
  userId: string
}
