import { gql } from '@apollo/client'

export const MUTATIONS_UPDATE_PRODUCT = gql`
  mutation updateProduct($product: ProductInput!) {
    productUpdate(input: $product) {
      product {
        id
      }
    }
  }
`
