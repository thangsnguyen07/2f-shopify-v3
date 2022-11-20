import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '..'

const getProductTags = (state: RootState) => state.masterTable.initProductTags

export const selectListProductTags = createSelector(getProductTags, value => value)
