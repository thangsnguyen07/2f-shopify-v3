import { FilterKeyName, FilterType, OptionType } from 'constants/AdjustFilter'
//Lodash
import isEmpty from 'lodash/isEmpty'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

//Polaris
import { Button, ChoiceList, Heading, Scrollable, Sheet, TextField } from '@shopify/polaris'
import { FilterMajor, MobileCancelMajor } from '@shopify/polaris-icons'

import { selectListProductTags } from 'store/MasterTableSlice/selector'
import { RootState } from 'store/index'

import { ProductTags, ProviderProps } from 'types'

import SearchBar from '../SearchBar'
import { Props as CustomCollapsibleProps } from './CustomCollapsible'
//Comp
import CustomCollapsible from './CustomCollapsible'

interface Props {
  onFilter: (query: string) => void
  onGetTagFilter?: (tag: ProviderProps[]) => void
  removeTags?: ProviderProps[]
}

const AdjustFilter: React.FC<Props> = ({ onFilter, onGetTagFilter, removeTags }): JSX.Element => {
  const [sheetActive, setSheetActive] = useState<boolean>(false)
  const [disabledButton, setDisabledButton] = useState<boolean>(true)
  const [countFilterSelected, setCountFilterSelected] = useState<number>(0)
  const [readOnly, setReadOnly] = useState<boolean>(false)
  const listProductTags = useSelector<RootState, ProductTags | null>(selectListProductTags)
  //#region Filter option

  //Filter field
  const [productVendor, setProductVenor] = useState<string[]>([])
  const [taggedWith, setTaggedWith] = useState<string>('')
  const [status, setStatus] = useState<string[]>([])
  const [availability, setAvailability] = useState<string[]>([])
  const [productType, setProductType] = useState<string[]>([])
  const [collection, setCollection] = useState<string[]>([])
  const [searchCollection, setSearchCollection] = useState<string>('')
  const [collectionList, setCollectionList] = useState<OptionType[]>([])
  const [publishingError, setPublishingError] = useState<string[]>([])
  const [giftCard, setGiftCard] = useState<string[]>([])

  //Filter function
  const productVendorList: OptionType[] =
    listProductTags?.productVendors?.map(x => ({ label: x, value: x })) || []
  const statusList: OptionType[] = [
    { label: 'Active', value: 'ACTIVE' },
    { label: 'Draft', value: 'DRAFT' },
    { label: 'Archived', value: 'ARCHIVED' },
  ]
  const availabilityList: OptionType[] = [
    { label: 'Unavailable on all channels', value: 'unavailable' },
    { label: 'Available on Online Store', value: 'online_store:visible' },
    { label: 'Unavailable on Online Store', value: 'online_store:hidden' },
    { label: 'Available on Shopify GraphiQL App', value: 'shopify-graphiql-app:visible' },
    { label: 'Unavailable on Shopify GraphiQL App', value: 'shopify-graphiql-app:hidden' },
  ]
  const productTypeList: OptionType[] =
    listProductTags?.productTypes?.map(x => ({ label: x, value: x })) || []
  const publishingErrorList: OptionType[] = [
    { label: 'Online Store', value: '650f1a14fa979ec5c74d063e968411d4' },
    { label: 'Gift Card', value: '5a3c93b0e9bc8d5abf63531fcd829b5d' },
  ]
  const giftCardList: OptionType[] = [{ label: 'Gift Card', value: 'Gift card' }]
  const orgCollectionList: OptionType[] =
    listProductTags?.collections?.map(x => ({ label: x.title, value: x.id })) || []

  const handleProductVendorRemove = () => setProductVenor([])
  const handleTaggedWithRemove = () => setTaggedWith('')
  const handleStatusRemove = () => setStatus([])
  const handleAvailabilityRemove = () => setAvailability([])
  const handleProductTypeRemove = () => setProductType([])
  const handleCollectionRemove = () => {
    setReadOnly(false)
    setSearchCollection('')
    setCollection([])
  }
  const handlePublishingErrorRemove = () => setPublishingError([])
  const handleGiftCardRemove = () => setGiftCard([])
  //#endregion Filter option

  const handleToggleSheetActive = useCallback((): void => {
    setSheetActive(!sheetActive)
  }, [sheetActive])

  const handleClearAllFilter = (): void => {
    handleProductVendorRemove()
    handleTaggedWithRemove()
    handleStatusRemove()
    handleAvailabilityRemove()
    handleProductTypeRemove()
    handlePublishingErrorRemove()
    handleGiftCardRemove()
    handleCollectionRemove()
    setDisabledButton(true)
  }

  const handleSearchCollection = (text: string): void => {
    setSearchCollection(text)
    const newList = orgCollectionList?.filter(f =>
      f.label?.toString().toLocaleLowerCase().includes(text.toLocaleLowerCase())
    )
    setCollectionList(newList)
  }

  const readOnlyCollection = useMemo(
    (): boolean =>
      !isEmpty(availability) ||
      !isEmpty(giftCard) ||
      !isEmpty(productType) ||
      !isEmpty(productVendor) ||
      !isEmpty(publishingError) ||
      !isEmpty(status) ||
      !isEmpty(taggedWith)
        ? true
        : false,
    [availability, giftCard, productType, productVendor, publishingError, status, taggedWith]
  )

  const filterList: CustomCollapsibleProps[] = [
    {
      keyName: FilterKeyName.VENDOR,
      label: 'Product vendor',
      children: (
        <ChoiceList
          name={FilterKeyName.VENDOR}
          title={null}
          choices={productVendorList}
          selected={productVendor}
          onChange={setProductVenor}
        />
      ),
      onRemove: handleProductVendorRemove,
      readOnly: readOnly,
    },
    {
      keyName: FilterKeyName.TAG,
      label: 'Tagged with',
      children: (
        <TextField
          id={FilterKeyName.TAG}
          label='Tagged with'
          value={taggedWith}
          onChange={setTaggedWith}
          autoComplete='off'
          labelHidden
        />
      ),
      onRemove: handleTaggedWithRemove,
      readOnly: readOnly,
    },
    {
      keyName: FilterKeyName.STATUS,
      label: 'Status',
      children: (
        <ChoiceList
          title={null}
          name={FilterKeyName.STATUS}
          choices={statusList}
          selected={status}
          onChange={setStatus}
          allowMultiple
        />
      ),
      onRemove: handleStatusRemove,
      readOnly: readOnly,
    },
    {
      keyName: FilterKeyName.PUBLISHING_STATUS,
      label: 'Availability',
      children: (
        <ChoiceList
          title={null}
          name={FilterKeyName.PUBLISHING_STATUS}
          choices={availabilityList}
          selected={availability}
          onChange={setAvailability}
        />
      ),
      onRemove: handleAvailabilityRemove,
      readOnly: readOnly,
    },
    {
      keyName: FilterKeyName.PRODUCT_TYPE,
      label: 'Product type',
      children: (
        <ChoiceList
          title={null}
          name={FilterKeyName.PRODUCT_TYPE}
          choices={productTypeList}
          selected={productType}
          onChange={setProductType}
        />
      ),
      onRemove: handleProductTypeRemove,
      readOnly: readOnly,
    },
    {
      keyName: FilterKeyName.COLLECTION_ID,
      label: 'Collection',
      prefix: (
        <SearchBar
          placeHolder='Search for collections'
          value={searchCollection}
          disabled={readOnlyCollection}
          onSearch={handleSearchCollection}
          onChange={handleSearchCollection}
        />
      ),
      children:
        collectionList?.length > 0 ? (
          <ChoiceList
            title={null}
            name={FilterKeyName.COLLECTION_ID}
            choices={collectionList}
            selected={collection}
            onChange={(selected: string[]) => {
              setCollection(selected)
              setReadOnly(true)
            }}
          />
        ) : (
          <span>No collections found</span>
        ),
      onRemove: handleCollectionRemove,
      readOnly: readOnlyCollection,
    },
    {
      keyName: FilterKeyName.ERROR_FEEDBACK,
      label: 'Publishing error',
      children: (
        <ChoiceList
          title={null}
          name={FilterKeyName.ERROR_FEEDBACK}
          choices={publishingErrorList}
          selected={publishingError}
          onChange={setPublishingError}
        />
      ),
      onRemove: handlePublishingErrorRemove,
      readOnly: readOnly,
    },
    {
      keyName: FilterKeyName.GIFT_CARD,
      label: 'Gift card',
      children: (
        <ChoiceList
          title={null}
          name={FilterKeyName.GIFT_CARD}
          choices={giftCardList}
          selected={giftCard}
          onChange={setGiftCard}
          allowMultiple
        />
      ),
      onRemove: handleGiftCardRemove,
      readOnly: readOnly,
    },
  ]

  const formatStringFilter = (keyName: string, value: string): string => `${keyName}:"${value}"`

  const convertToArray = (data: string[] | string): string[] => ([] as string[]).concat(data)

  const getLabelFromList = (
    list: OptionType[],
    keyName: string,
    data: string | string[]
  ): string => {
    const labels: string[] = []
    const tempArray = convertToArray(data)
    tempArray.forEach(item => {
      const label = list.find(f => f.value === item)?.label?.toString()
      labels.push(label || item)
    })
    return `${filterList.find(f => f.keyName === keyName)?.label}: ${labels.join(', ')}`
  }

  const getInfoFromFilter = useCallback(
    (data: Record<string, string | string[]>): ProviderProps[] => {
      const result: ProviderProps[] = []
      const vendor = data[FilterKeyName.VENDOR] as string[]
      const tag = data[FilterKeyName.TAG] as string
      const status = data[FilterKeyName.STATUS] as string[]
      const publishing = data[FilterKeyName.PUBLISHING_STATUS] as string[]
      const type = data[FilterKeyName.PRODUCT_TYPE] as string[]
      const error = data[FilterKeyName.ERROR_FEEDBACK] as string[]
      const gift = data[FilterKeyName.GIFT_CARD] as string[]
      const collection = data[FilterKeyName.COLLECTION_ID] as string[]
      !isEmpty(vendor) &&
        result.push({
          [FilterType.VALUE]: vendor,
          [FilterType.KEY]: FilterKeyName.VENDOR,
          [FilterType.QUERY]: formatStringFilter(FilterKeyName.VENDOR, vendor?.join(',')),
          [FilterType.LABEL]: getLabelFromList(productVendorList, FilterKeyName.VENDOR, vendor),
        })
      !isEmpty(tag) &&
        result.push({
          [FilterType.VALUE]: tag,
          [FilterType.KEY]: FilterKeyName.TAG,
          [FilterType.QUERY]: formatStringFilter(FilterKeyName.TAG, tag),
          [FilterType.LABEL]: getLabelFromList([], FilterKeyName.TAG, tag),
        })
      !isEmpty(status) &&
        result.push({
          [FilterType.VALUE]: status,
          [FilterType.KEY]: FilterKeyName.STATUS,
          [FilterType.QUERY]: formatStringFilter(FilterKeyName.STATUS, status.join(',')),
          [FilterType.LABEL]: getLabelFromList(statusList, FilterKeyName.STATUS, status),
        })
      !isEmpty(publishing) &&
        result.push({
          [FilterType.VALUE]: publishing,
          [FilterType.KEY]: FilterKeyName.PUBLISHING_STATUS,
          [FilterType.QUERY]: formatStringFilter(
            FilterKeyName.PUBLISHING_STATUS,
            publishing.join(',')
          ),
          [FilterType.LABEL]: getLabelFromList(
            availabilityList,
            FilterKeyName.PUBLISHING_STATUS,
            publishing
          ),
        })
      !isEmpty(type) &&
        result.push({
          [FilterType.VALUE]: type,
          [FilterType.KEY]: FilterKeyName.PRODUCT_TYPE,
          [FilterType.QUERY]: formatStringFilter(FilterKeyName.PRODUCT_TYPE, type.join(',')),
          [FilterType.LABEL]: getLabelFromList(productTypeList, FilterKeyName.PRODUCT_TYPE, type),
        })
      !isEmpty(error) &&
        result.push({
          [FilterType.VALUE]: error,
          [FilterType.KEY]: FilterKeyName.ERROR_FEEDBACK,
          [FilterType.QUERY]: formatStringFilter(FilterKeyName.ERROR_FEEDBACK, error.join(',')),
          [FilterType.LABEL]: getLabelFromList(
            publishingErrorList,
            FilterKeyName.ERROR_FEEDBACK,
            error
          ),
        })
      !isEmpty(gift) &&
        result.push({
          [FilterType.VALUE]: 'true',
          [FilterType.KEY]: FilterKeyName.GIFT_CARD,
          [FilterType.QUERY]: formatStringFilter(FilterKeyName.GIFT_CARD, gift.join(',')),
          [FilterType.LABEL]: getLabelFromList(giftCardList, FilterKeyName.GIFT_CARD, gift),
        })
      !isEmpty(collection) &&
        result.push({
          [FilterType.VALUE]: collection,
          [FilterType.KEY]: FilterKeyName.COLLECTION_ID,
          [FilterType.QUERY]: formatStringFilter(FilterKeyName.COLLECTION_ID, collection.join(',')),
          [FilterType.LABEL]: getLabelFromList(
            orgCollectionList,
            FilterKeyName.COLLECTION_ID,
            collection
          ),
        })
      return result
    },
    []
  )

  useEffect(() => {
    if (
      !isEmpty(productVendor) ||
      !isEmpty(taggedWith) ||
      !isEmpty(status) ||
      !isEmpty(productType) ||
      !isEmpty(publishingError) ||
      !isEmpty(giftCard) ||
      !isEmpty(availability) ||
      !isEmpty(collection)
    ) {
      setDisabledButton(false)
    }

    const param: Record<string, string | string[]> = {
      [FilterKeyName.VENDOR]: productVendor,
      [FilterKeyName.TAG]: taggedWith,
      [FilterKeyName.STATUS]: status,
      [FilterKeyName.PRODUCT_TYPE]: productType,
      [FilterKeyName.PUBLISHING_STATUS]: availability,
      [FilterKeyName.ERROR_FEEDBACK]: publishingError,
      [FilterKeyName.GIFT_CARD]: giftCard,
      [FilterKeyName.COLLECTION_ID]: collection,
    }

    const info = getInfoFromFilter(param)
    onFilter(info.map(m => m[FilterType.QUERY]).join(' '))

    if (onGetTagFilter) {
      onGetTagFilter(info)
    }

    setCountFilterSelected(info.length || 0)
    // eslint-disable-next-line
  }, [
    availability,
    giftCard,
    productType,
    productVendor,
    publishingError,
    status,
    taggedWith,
    collection,
  ])

  useEffect(() => {
    if (removeTags && removeTags?.length > 0) {
      removeTags.forEach(item => {
        switch (item[FilterType.KEY]) {
          case FilterKeyName.VENDOR:
            handleProductVendorRemove()
            break
          case FilterKeyName.TAG:
            handleTaggedWithRemove()
            break
          case FilterKeyName.STATUS:
            handleStatusRemove()
            break
          case FilterKeyName.PUBLISHING_STATUS:
            handleAvailabilityRemove()
            break
          case FilterKeyName.PRODUCT_TYPE:
            handleProductTypeRemove()
            break
          case FilterKeyName.ERROR_FEEDBACK:
            handlePublishingErrorRemove()
            break
          case FilterKeyName.GIFT_CARD:
            handleGiftCardRemove()
            break
          case FilterKeyName.COLLECTION_ID:
            handleCollectionRemove()
            break
          default:
            break
        }
      })
    } else {
      handleClearAllFilter()
    }
  }, [removeTags])

  const filterButton = useMemo(
    (): JSX.Element => (
      <div className='relative w-40'>
        <Button fullWidth textAlign='left' icon={FilterMajor} onClick={handleToggleSheetActive}>
          Adjust Filter
        </Button>
        <span className='absolute text-center pointer-events-none top-2 right-3 w-1/6 ml-1.5 rounded py-0.5 px-1.5 bg-gray-200 text-xs font-semibold text-gray-700 tabular-nums'>
          {countFilterSelected}
        </span>
      </div>
    ),
    [countFilterSelected, handleToggleSheetActive]
  )

  return (
    <>
      {filterButton}
      <Sheet
        open={sheetActive}
        onClose={handleToggleSheetActive}
        accessibilityLabel={'Adjust Filter'}>
        <div className='flex flex-col h-full'>
          <div className='flex w-full justify-between items-center p-4 border-b border-solid'>
            <Heading>Adjust Filter</Heading>
            <Button icon={MobileCancelMajor} onClick={handleToggleSheetActive} plain />
          </div>
          <Scrollable className='h-full p-4'>
            {filterList?.map(m => (
              <CustomCollapsible
                key={m.keyName}
                keyName={m.keyName}
                label={m.label}
                onRemove={m.onRemove}
                readOnly={m.readOnly}
                prefix={m.prefix}>
                {m.children}
              </CustomCollapsible>
            ))}
          </Scrollable>
          <div className='flex w-100 justify-between items-center py-4 px-5 border-t border-solid'>
            <Button disabled={disabledButton} onClick={handleClearAllFilter}>
              Clear all filter
            </Button>
            <Button primary onClick={handleToggleSheetActive}>
              Done
            </Button>
          </div>
        </div>
      </Sheet>
    </>
  )
}

export default AdjustFilter
