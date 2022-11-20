// import { type } from 'os'

export interface Product {
  id: string
  availablePublicationCount: number
  createdAt: string
  customProductType: string
  defaultCursor: string
  description: string
  descriptionHtml: string
  featuredImage: Image
  featuredMedia: Media
  feedback: ResourceFeedback
  giftCardTemplateSuffix: string
  handle: string
  hasOnlyDefaultVariant: boolean
  hasOutOfStockVariants: boolean
  isGiftCard: boolean
  legacyResourceId: number
  mediaCount: number
  onlineStorePreviewUrl: string
  onlineStoreUrl: string
  publishedAt: string
  publishedOnCurrentPublication: boolean
  requiresSellingPlan: boolean
  tags: string[]
  templateSuffix: string
  title: string
  totalInventory: number
  totalVariants: number
  tracksInventory: boolean
  vendor: string
  status: ProductStatus
  // images(
  // maxWidth: Int
  // maxHeight: Int
  // crop: CropRegion
  // scale: Int = 1
  // first: Int
  // after: String
  // last: Int
  // before: String
  // reverse: Boolean = false
  // sortKey: ProductImageSortKeys = POSITION
  // ): ImageConnection!
  // inCollection(id: ID!): Boolean!
  // media(
  // first: Int
  // after: String
  // last: Int
  // before: String
  // reverse: Boolean = false
  // sortKey: ProductMediaSortKeys = POSITION
  // ): MediaConnection!
  // metafield(namespace: String!key: String!): Metafield
  // metafieldDefinitions(
  // namespace: String
  // pinnedStatus: MetafieldDefinitionPinnedStatus = ANY
  // first: Int
  // after: String
  // last: Int
  // before: String
  // reverse: Boolean = false
  // sortKey: MetafieldDefinitionSortKeys = ID
  // query: String
  // ): MetafieldDefinitionConnection!
  // metafields(
  // namespace: String
  // first: Int
  // after: String
  // last: Int
  // before: String
  // reverse: Boolean = false
  // ): MetafieldConnection!
  // options(first: Int): [ProductOption!]!
  // priceRangeV2: ProductPriceRangeV2!
  // privateMetafield(namespace: String!key: String!): PrivateMetafield
  // privateMetafields(
  // namespace: String
  // first: Int
  // after: String
  // last: Int
  // before: String
  // reverse: Boolean = false
  // ): PrivateMetafieldConnection!
  // productType: String!
  // publicationCount(onlyPublished: Boolean = true): Int!
  // publishedOnPublication(publicationId: ID!): Boolean!
  // resourcePublicationOnCurrentPublication: ResourcePublicationV2
  // resourcePublications(
  // onlyPublished: Boolean = true
  // first: Int
  // after: String
  // last: Int
  // before: String
  // reverse: Boolean = false
  // ): ResourcePublicationConnection!
  // resourcePublicationsV2(
  // onlyPublished: Boolean = true
  // first: Int
  // after: String
  // last: Int
  // before: String
  // reverse: Boolean = false
  // ): ResourcePublicationV2Connection!
  // sellingPlanGroupCount: Int!
  // sellingPlanGroups(
  // first: Int
  // after: String
  // last: Int
  // before: String
  // reverse: Boolean = false
  // ): SellingPlanGroupConnection!
  // seo: SEO!
  // standardizedProductType: StandardizedProductType
  // translations(locale: String!): [PublishedTranslation!]!
  // unpublishedPublications(
  // first: Int
  // after: String
  // last: Int
  // before: String
  // reverse: Boolean = false
  // ): PublicationConnection!
  // updatedAt: DateTime!
  // variants(
  // first: Int
  // after: String
  // last: Int
  // before: String
  // reverse: Boolean = false
  // sortKey: ProductVariantSortKeys = POSITION
  // ): ProductVariantConnection!
}

export interface Image {
  id: string
  altText: string
  height: number
  url: string
  width: number
}

export interface Media {
  alt: string
  mediaContentType: 'VIDEO' | 'IMAGE' | 'EXTERNAL_VIDEO' | 'MODEL_3D'
  mediaErrors: {
    code: string
    detail: string
    message: string
  }
  preview: {
    image: Image
    status: 'READY' | 'PROCESSING' | 'FAILED' | 'UPLOADED'
  }
}

export interface Link {
  label: string
  url: string
  translations: PublishedTranslation[]
}

export interface PublishedTranslation {
  key: string
  locale: string
  value: string
}

export interface ResourceFeedback {
  summary: string
  details: AppFeedback
}

export interface AppFeedback {
  app: App
  link: Link
  messages: UserError[]
}

export interface UserError {
  field: string[]
  message: string
}

export interface App {
  id: string
  apiKey: string
  appStoreAppUrl: string
  appStoreDeveloperUrl: string
  availableAccessScopes: AccessScope[]
  banner: Image
  description: string
  developerName: string
  developerType: AppDeveloperType
  embedded: boolean
  failedRequirements: FailedRequirement[]
  features: string[]
  feedback: AppFeedback
  handle: string
  icon: Image
  installUrl: string
  // installation: AppInstallation    // TODO: add this type
  isPostPurchaseAppInUse: boolean
  previouslyInstalled: boolean
  pricingDetails: string
  pricingDetailsSummary: string
  privacyPolicyUrl: string
  // publicCategory: AppPublicCategory  // TODO: add this type
  published: boolean
  requestedAccessScopes: AccessScope[]
  screenshots: Image[]
  shopifyDeveloped: boolean
  title: string
  uninstallMessage: string
  webhookApiVersion: string
}

export interface AccessScope {
  description: string
  handle: string
}

export type AppDeveloperType = 'SHOPIFY' | 'PARTNER' | 'MERCHANT' | 'UNKNOWN'

export type ProductStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'

export interface FailedRequirement {
  message: string
  action: NavigationItem
}

export interface NavigationItem {
  id: string
  title: string
  url: string
}

export interface CollectionProduct {
  id: string
  title: string
}
