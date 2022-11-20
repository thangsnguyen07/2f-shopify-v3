export interface OptionType {
  label: React.ReactNode
  value: string
}

export enum FilterType {
  QUERY = 'query',
  LABEL = 'label',
  VALUE = 'value',
  KEY = 'key',
}

export enum FilterKeyName {
  VENDOR = 'vendor',
  TAG = 'tag',
  STATUS = 'status',
  PUBLISHING_STATUS = 'published_status',
  PRODUCT_TYPE = 'product_type',
  COLLECTION_ID = 'collection_id',
  ERROR_FEEDBACK = 'error_feedback',
  GIFT_CARD = 'gift_card',
}
