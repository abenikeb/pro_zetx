export enum ProductStatus {
    INACTIVE = 0,
    ACTIVE = 1,
  }
  
  export class ProductType {
    id?: string | undefined
    name: string
    price: Number
    location: string
    status: ProductStatus
    category: string
    quantity: number
    // Optional props
    images?: Array<string>
    tags?: Array<string>
    description?: string
    postedDate?: string = new Date().toUTCString()
    updateDate?: string = new Date().toUTCString()
  
    constructor(product: ProductType) {
      this.name = product.name
      this.location = product.location
      this.status = product.status
      this.price = product.price
      this.category = product.category
      this.quantity = product.quantity || 0
  
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
  
      @returns {boolean} Returns true if values are validated. False otherwise.
     */
    validate?() {
      let isValidated: boolean = true
  
      isValidated =
        this.name.length > 0 &&
        this.location.length > 0 &&
        this.price > 0 &&
        this.category.length > 0
  
      return isValidated
    }
  }
  
  export class ProductCategory {
    name?: string
    value?: string
  }
  
  export class ProductState {
    products?: Array<ProductType>
    productCategories?: Array<ProductCategory>
    productTags?: Array<string>
  }