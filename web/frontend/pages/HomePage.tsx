import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { Tag } from '@shopify/polaris'

import { CollectionProduct, ProviderProps } from 'types'

import logo from '../assets/logo.png'
import { FilterType } from '../constants/AdjustFilter'
import AdjustFilter from '../containers/AdjustFilter'
import CustomizeDisplay from 'containers/CustomizeDisplay'
import MasterTable from '../containers/MasterTable'
import SearchBar from '../containers/SearchBar'
import {
  QUERY_GET_ALL_POSTS,
  QUERY_GET_PRODUCTS,
  QUERY_GET_PRODUCTS_TAGS,
} from '../services/queries'
import { masterTableActions } from '../store/MasterTableSlice'
import { useAppQuery, useAuthenticatedFetch } from '../hooks'
import { useQuery } from '@tanstack/react-query'
import { GraphQLClient } from 'graphql-request'

export default function HomePage() {
  const dispatch = useDispatch()
  const [productQueryVariable, setProductQueryVariable] = useState({
    first: 25,
    sortKey: 'TITLE',
    query: '',
  })
  const [tagList, setTagList] = useState<ProviderProps[]>([])
  const [removeTagList, setRemoveTagList] = useState<ProviderProps[]>([])

  // const API_URL = `https://thang-2f.myshopify.com/api/2022-10/graphql.json`
  // const graphQLClient = new GraphQLClient(API_URL, {
  //   fetch: useAuthenticatedFetch(),
  //   credentials: 'include',
  //   mode: 'cors',
  //   // headers: useAuthenticatedFetch()
  // })

  const { data, isFetching: loadingTags } = useAppQuery({
    queryKey: ['productsTags'],
    fetchInit: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': '05387ff3fd4621766dbff6f2f4902877',
      },
      body: JSON.stringify({
        query: QUERY_GET_PRODUCTS,
        variables: {
          first: 10,
        },
      }),
    },
    reactQueryOptions: {
      onSuccess: () => {
        console.log('success')
      },
      onError: () => {
        console.log('error')
      },
    },
  })

  useEffect(() => {
    console.log(data)

    console.log(loadingTags)
  }, [data, loadingTags])

  // const { loading: loadingTags } = useQuery(QUERY_GET_PRODUCTS_TAGS, {
  //   variables: {
  //     first: 25,
  //   },
  //   onCompleted: data => {
  //     dispatch(
  //       masterTableActions.setInitProductTags({
  //         productVendors: data?.shop?.productVendors?.edges?.map((x: any) => x.node),
  //         productTypes: data?.shop?.productTypes?.edges?.map((x: any) => x.node),
  //         collections: data?.collections?.nodes?.map(
  //           (x: any) =>
  //             ({ id: x?.id?.match(/\d+$/g)?.shift(), title: x?.title } as CollectionProduct)
  //         ),
  //       })
  //     )
  //   },
  //   onError: error => {
  //     console.log(error)
  //   },
  // })

  // useEffect(() => {
  //   dispatch(masterTableActions.setIsLoading(loadingTags))
  // }, [loadingTags, dispatch])

  // const handleFilter = (query: string): void => {
  //   setProductQueryVariable({
  //     ...productQueryVariable,
  //     query: query,
  //   })
  // }

  // const handleRemoveTagFilter = (tag: string): void => {
  //   setRemoveTagList(tagList.filter(f => f[FilterType.LABEL] === tag))
  //   setTagList(prev => prev.filter(f => f[FilterType.LABEL] !== tag))
  // }

  // const handleSearch = (text: string): void => {
  //   setProductQueryVariable({
  //     ...productQueryVariable,
  //     query: text ? `title: '${text}'` : '',
  //   })
  // }

  return (
    <>
      {/* <button
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
      </div> */}
      <div>Hello Table</div>
      <MasterTable />
    </>
  )
}
