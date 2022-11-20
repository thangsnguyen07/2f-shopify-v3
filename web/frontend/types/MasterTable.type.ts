import { CollectionProduct, Product } from './Product.type'

export type SimpleProductRow = Product

export interface SummaryRow {
  id: string
  totalCount: number
  yesCount: number
}

export interface RememberedProductKeys {
  [key: string]: boolean
}

export interface ListRememberedProduct {
  id: string
  remember: RememberedProductKeys[]
}

export interface ProductTags {
  productVendors: string[]
  productTypes: string[]
  collections: CollectionProduct[]
}
