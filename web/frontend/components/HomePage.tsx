import { useQuery } from '@apollo/client'

import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { Tag } from '@shopify/polaris'

import { CollectionProduct, ProviderProps } from 'types'

import logo from '../assets/logo.png'
import { FilterType } from '../constants/AdjustFilter'
import AdjustFilter from '../containers/AdjustFilter'
import CustomizeDisplay from '../containers/CustomizeDisplay'
import MasterTable from '../containers/MasterTable'
import SearchBar from '../containers/SearchBar'
import { QUERY_GET_PRODUCTS, QUERY_GET_PRODUCTS_TAGS } from '../services/queries'
import { masterTableActions } from '../store/MasterTableSlice'

export function HomePage() {
  const dispatch = useDispatch()
  const [productQueryVariable, setProductQueryVariable] = useState({
    first: 25,
    sortKey: 'TITLE',
    query: '',
  })
  const [tagList, setTagList] = useState<ProviderProps[]>([])
  const [removeTagList, setRemoveTagList] = useState<ProviderProps[]>([])

  const { loading } = useQuery(QUERY_GET_PRODUCTS, {
    variables: {
      ...productQueryVariable,
    },
    onCompleted: data => {
      console.log(data.products.nodes)
      dispatch(masterTableActions.setInitState(data.products.nodes))
    },
    onError: error => {
      console.log(error)
    },
  })

  const { loading: loadingTags } = useQuery(QUERY_GET_PRODUCTS_TAGS, {
    variables: {
      first: 25,
    },
    onCompleted: data => {
      dispatch(
        masterTableActions.setInitProductTags({
          productVendors: data?.shop?.productVendors?.edges?.map((x: any) => x.node),
          productTypes: data?.shop?.productTypes?.edges?.map((x: any) => x.node),
          collections: data?.collections?.nodes?.map(
            (x: any) =>
              ({ id: x?.id?.match(/\d+$/g)?.shift(), title: x?.title } as CollectionProduct)
          ),
        })
      )
    },
    onError: error => {
      console.log(error)
    },
  })

  useEffect(() => {
    dispatch(masterTableActions.setIsLoading(loading && loadingTags))
  }, [loading, loadingTags, dispatch])

  const handleFilter = (query: string): void => {
    setProductQueryVariable({
      ...productQueryVariable,
      query: query,
    })
  }

  const handleRemoveTagFilter = (tag: string): void => {
    setRemoveTagList(tagList.filter(f => f[FilterType.LABEL] === tag))
    setTagList(prev => prev.filter(f => f[FilterType.LABEL] !== tag))
  }

  const handleSearch = (text: string): void => {
    setProductQueryVariable({
      ...productQueryVariable,
      query: text ? `title: '${text}'` : '',
    })
  }

  return (
    <>
      <button
        onClick={() =>
          // This button show you how we refetch the data.
          // Just update the query variable and the data will be refetched.
          setProductQueryVariable({
            ...productQueryVariable,
            query: "title: 'black'",
          })
        }>
        Test search with name = black
      </button>
      <div className='flex w-full gap-2'>
        {tagList?.map((value, index) => (
          <Tag key={index} onRemove={() => handleRemoveTagFilter(value[FilterType.LABEL])}>
            {value[FilterType.LABEL]}
          </Tag>
        ))}
      </div>

      <div className='flex flex-wrap'>
        <img src={logo} className='w-full h-full w-28' alt='logo-qep' />
        <SearchBar placeHolder='Search products' className='w-96' onSearch={handleSearch} />
        <CustomizeDisplay />
        <AdjustFilter
          removeTags={removeTagList}
          onFilter={handleFilter}
          onGetTagFilter={setTagList}
        />
      </div>
      <MasterTable />
    </>
  )
}
