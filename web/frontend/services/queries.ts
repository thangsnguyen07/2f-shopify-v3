import { gql } from 'graphql-request'

export const QUERY_GET_PRODUCTS = gql`
  query ListAllProduct($first: Int!, $sortKey: ProductSortKeys, $query: String) {
    products(first: $first, sortKey: $sortKey, query: $query) {
      nodes {
        id
        createdAt
        customProductType
        defaultCursor
        description
        descriptionHtml
        featuredImage {
          id
        }
        featuredMedia {
          alt
        }
        giftCardTemplateSuffix
        handle
        hasOnlyDefaultVariant
        hasOutOfStockVariants
        isGiftCard
        legacyResourceId
        mediaCount
        onlineStorePreviewUrl
        onlineStoreUrl
        publishedAt
        requiresSellingPlan
        tags
        templateSuffix
        title
        totalInventory
        totalVariants
        tracksInventory
        status
        vendor
      }
      pageInfo {
        endCursor
        startCursor
      }
    }
  }
`

export const QUERY_GET_PRODUCTS_TAGS = gql`
  query ListAllProductTags($first: Int!) {
    shop {
      productVendors(first: $first) {
        edges {
          cursor
          node
        }
      }
      productTypes(first: $first) {
        edges {
          node
        }
      }
    }
    collections(first: $first) {
      nodes {
        title
        id
      }
    }
  }
`

export const QUERY_GET_ALL_POSTS = gql`
  query ($options: PageQueryOptions) {
    posts(options: $options) {
      data {
        id
        title
      }
      meta {
        totalCount
      }
    }
  }
`
