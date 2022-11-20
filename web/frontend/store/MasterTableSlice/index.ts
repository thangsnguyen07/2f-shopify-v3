import { PayloadAction, createSlice, current } from '@reduxjs/toolkit'

import { ListRememberedProduct, ProductTags, SimpleProductRow } from 'types'

export interface MasterTableState {
  products: SimpleProductRow[]
  initProducts: SimpleProductRow[]
  selectedRows: Set<number>
  isLoading: boolean
  rememberProductChanged: ListRememberedProduct[]
  initProductTags: ProductTags | null
}

const initialState: MasterTableState = {
  products: [],
  initProducts: [],
  selectedRows: new Set([]),
  isLoading: false,
  rememberProductChanged: [],
  initProductTags: null,
}

export const masterTableSlice = createSlice({
  name: 'MasterTable',
  initialState,
  reducers: {
    setInitState: (state: MasterTableState, action: PayloadAction<SimpleProductRow[]>) => {
      state.initProducts = action.payload
      state.products = action.payload
      state.rememberProductChanged = []
      state.selectedRows = new Set([])
    },
    setInitProductTags: (state: MasterTableState, action: PayloadAction<ProductTags>) => {
      state.initProductTags = action.payload
    },
    setProducts: (state: MasterTableState, action: PayloadAction<SimpleProductRow[]>) => {
      state.products = action.payload
    },
    setInitProducts: (state: MasterTableState, action: PayloadAction<SimpleProductRow[]>) => {
      state.initProducts = action.payload
    },
    setSelectedRows: (state: MasterTableState, action: PayloadAction<Set<number>>) => {
      state.selectedRows = action.payload
    },
    setIsLoading: (state: MasterTableState, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setRememberProductChanged: (
      state: MasterTableState,
      action: PayloadAction<{ id: string; key: string; isChanged: boolean }>
    ) => {
      const { id, key, isChanged } = action.payload
      let indexOfProduct = 0
      let product = state.rememberProductChanged?.find((data, index) => {
        if (data.id === id) {
          indexOfProduct = index
          return true
        }
        return false
      })

      let isProductExisted = true
      if (!product) {
        product = { id: id, remember: [] }
        isProductExisted = false
      }

      let productKey
      if (isProductExisted) {
        productKey = product?.remember.find(x => {
          if (x[key]) {
            return true
          }
          return false
        })
      }

      if (productKey) {
        console.log(current(productKey))
        if (!isChanged) {
          product.remember = product.remember.filter(x => {
            if (x[key]) {
              return false
            }
            return true
          })
          if (product.remember.length === 0) {
            state.rememberProductChanged.splice(indexOfProduct, 1)
          }
        }
      } else {
        if (isChanged) {
          product.remember.push({ [key]: true })
          if (!isProductExisted) {
            state.rememberProductChanged.push(product)
          }
        }
      }

      console.log(current(state.rememberProductChanged))
    },
  },
})

export const masterTableActions = masterTableSlice.actions
