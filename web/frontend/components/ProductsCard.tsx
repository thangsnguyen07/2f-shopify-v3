import { useEffect, useState } from 'react'
import { Card, Heading, TextContainer, DisplayText, TextStyle, Text } from '@shopify/polaris'
import { Toast } from '@shopify/app-bridge-react'
import { useAppQuery, useAuthenticatedFetch } from '../hooks'

interface ToastProps {
  content: string
  duration?: number
  error?: boolean
  onDismiss?: () => void
  action?: {
    content: string
    onAction: () => void
  }
}

export function ProductsCard() {
  const emptyToastProps: ToastProps = {
    content: '',
  }
  const [isLoading, setIsLoading] = useState(true)
  const [toastProps, setToastProps] = useState<ToastProps>(emptyToastProps)
  const fetch = useAuthenticatedFetch()

  const {
    data,
    refetch: refetchProductCount,
    isLoading: isLoadingCount,
    isRefetching: isRefetchingCount,
  } = useAppQuery({
    queryKey: ['productCount'],
    url: '/api/products/count',
    reactQueryOptions: {
      queryKey: ['productCount'],
      onSuccess: () => {
        setIsLoading(false)
      },
    },
  })

  useEffect(() => {
    console.log(data)
  }, [data])

  const toastMarkup = toastProps.content && !isRefetchingCount && (
    <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />
  )

  const handlePopulate = async () => {
    setIsLoading(true)
    const response = await fetch('/api/products/create')

    if (response.ok) {
      await refetchProductCount()
      setToastProps({ content: '5 products created!' })
    } else {
      setIsLoading(false)
      setToastProps({
        content: 'There was an error creating products',
        error: true,
      })
    }
  }

  return (
    <>
      {toastMarkup}
      <Card
        title='Product Counter'
        sectioned
        primaryFooterAction={{
          content: 'Populate 5 products',
          onAction: handlePopulate,
          loading: isLoading,
        }}>
        <TextContainer spacing='loose'>
          <p>
            Sample products are created with a default title and price. You can remove them at any
            time.
          </p>
          <Text as='h4' variant='headingLg'>
            TOTAL PRODUCTS
            <Text as='p' variant='heading3xl'>
              {isLoadingCount ? '-' : 0}
            </Text>
          </Text>
        </TextContainer>
      </Card>
    </>
  )
}
