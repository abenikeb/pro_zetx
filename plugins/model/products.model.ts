import { Locaiton } from './utils.model'
import { OrderState } from './order.model'

/** Firebase Collection Names */
export const PRODUCTS_COLLECTION = 'products'
export const PRODUCT_CATEGORIES_COLLECTION = 'productCategories'
export const PRODUCT_TAGS_COLLECTION = 'productTags'

export enum ProductStatus {
  INACTIVE = 'inactive',
  ACTIVE = 'active',
}

export interface Inventory {
  instock: number
  forsale: number
  sold: number
}

export class ProductType {
  id?: string | undefined
  name: string
  price: number
  carbonReduction: number
  location: Locaiton
  status: ProductStatus
  category: string
  // Optional props
  images?: Array<string>
  tags?: Array<string>
  description?: string
  postedDate?: string = new Date().toUTCString()
  updateDate?: string = new Date().toUTCString()
  sellerId?: string
  inventory?: Inventory

  constructor(product: ProductType) {
    this.name = product.name
    this.location = product.location
    this.location.borrow = product.location.borrow || ''
    this.status = product.status
    this.price = Number.parseInt(`${product.price}`)
    this.category = product.category
    this.inventory = product.inventory || {
      instock: 0,
      forsale: 0,
      sold: 0,
    }
    this.sellerId = product.sellerId
    this.carbonReduction = product.carbonReduction

    /* Optional Props */
    this.id = product.id || undefined
    this.tags = product.tags || []
    this.description = product.description || ''
    this.images = product.images || []
  }
}

export class Product extends ProductType {
  /**
    Checks if the product values are valid.
   */
  validate?(): boolean {
    let isValidated: boolean = true

    isValidated =
      this.name.length > 0 && this.price > 0 && this.category.length > 0

    return isValidated
  }

  toJSON?(withId: boolean = false): object {
    const productInventory = this.inventory as Inventory

    const output = {
      name: this.name,
      price: +this.price,
      carbonReduction: +this.carbonReduction,
      location: this.location,
      status: this.status,
      category: this.category,
      images: this.images,
      tags: this.tags,
      description: this.description,
      postedDate:
        typeof this.postedDate === 'undefined'
          ? new Date(Date.now())
          : this.postedDate,
      updateDate:
        typeof this.postedDate === 'undefined'
          ? new Date(Date.now())
          : this.updateDate,
      sellerId: this.sellerId,
      inventory: {
        sold: +productInventory.sold,
        forsale: +productInventory.forsale,
        instock: +productInventory.sold,
      },
    }

    return withId ? { ...output, id: this.id } : output
  }
}

export class ProductCategory {
  name?: string
  value?: string
}

export interface ProductState {
  products?: Array<ProductType>
  productCategories?: Array<ProductCategory>
  productTags?: Array<string>
}

export interface ProductSellerState {
  products: ProductState
  orders: OrderState
}

export type ProductCollection = Array<ProductType>

export class ProductNotFound extends Error {
  constructor() {
    super('Product not found in marketplace')
  }
}
