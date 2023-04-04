import { configureStore } from '@reduxjs/toolkit'
import loadingReducer from './features/loading/loadingSlice'

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
  },
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch