import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface LoadingState {
    value: boolean
}

const initialState: LoadingState = {
    value: true,
}

export const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        isLoading: (state) => {
            state.value = true
        },
        notLoading: (state) => {
            state.value = false
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.value = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { isLoading, notLoading, setLoading } = loadingSlice.actions

export default loadingSlice.reducer