import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { OptionDescriptor } from '@shopify/polaris/build/ts/latest/src/types'

export interface CustomizeDisplayState {
  listColumn: OptionDescriptor[]
  listHiddenColumn: string[]
}

const initialState: CustomizeDisplayState = {
  listColumn: [],
  listHiddenColumn: [],
}

const customizeDisplay = createSlice({
  name: 'CustomizeDisplay',
  initialState,
  reducers: {
    setListColumn: (
      draftState: CustomizeDisplayState,
      action: PayloadAction<OptionDescriptor[]>
    ) => {
      draftState.listColumn = [{ label: 'All', value: 'all' }, ...action.payload]
    },
    setListHiddenColumn: (draftState: CustomizeDisplayState, action: PayloadAction<string[]>) => {
      draftState.listHiddenColumn = [...action.payload]
    },
    clearListColumn: (draftState: CustomizeDisplayState) => {
      draftState.listColumn = []
    },
  },
})

export const { actions, reducer } = customizeDisplay
