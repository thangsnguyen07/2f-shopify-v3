import { useAuthenticatedFetch } from './useAuthenticatedFetch'
import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'

/**
 * A hook for querying your custom app data.
 * @desc A thin wrapper around useAuthenticatedFetch and react-query's useQuery.
 *
 * @param {Object} options - The options for your query. Accepts 3 keys:
 *
 * 1. url: The URL to query. E.g: /api/widgets/1`
 * 2. fetchInit: The init options for fetch.  See: https://developer.mozilla.org/en-US/docs/Web/API/fetch#parameters
 * 3. reactQueryOptions: The options for `useQuery`. See: https://react-query.tanstack.com/reference/useQuery
 *
 * @returns Return value of useQuery.  See: https://react-query.tanstack.com/reference/useQuery.
 */

// type UseAppQueryProps = {
//   url: string
//   fetchInit?: any
//   reactQueryOptions: any
// }
const GRAPHQL_API_URL = `https://thang-2f.myshopify.com/api/2022-10/graphql.json`
const GRAPHQL_FAKE_API_URL = `https://graphqlzero.almansi.me/api`

export const useAppQuery = ({ url = '', queryKey, fetchInit = {}, reactQueryOptions = {} }) => {
  const authenticatedFetch = useAuthenticatedFetch()
  const fetch = useMemo(() => {
    return async () => {
      const response = await authenticatedFetch(url || GRAPHQL_API_URL, fetchInit)
      return response.json()
    }
  }, [url, JSON.stringify(fetchInit)])

  return useQuery({
    queryKey,
    queryFn: fetch,
    ...reactQueryOptions,
    refetchOnWindowFocus: false,
  })

  // return useQuery(url, fetch, {
  //   ...reactQueryOptions,
  //   refetchOnWindowFocus: false,
  // })
}
