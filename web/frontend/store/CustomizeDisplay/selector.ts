import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '..'

const getCustomizeDisplay = (state: RootState) => state.customizeDisplay

export const selectListColumn = createSelector(getCustomizeDisplay, value => value.listColumn)
export const selectListHiddenColumn = createSelector(
  getCustomizeDisplay,
  value => value.listHiddenColumn
)
