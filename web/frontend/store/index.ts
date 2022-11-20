import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'

import { reducer as customizeDisplayReducer } from './CustomizeDisplay'
import { masterTableSlice } from './MasterTableSlice'

export const store = configureStore({
  reducer: {
    masterTable: masterTableSlice.reducer,
    customizeDisplay: customizeDisplayReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
