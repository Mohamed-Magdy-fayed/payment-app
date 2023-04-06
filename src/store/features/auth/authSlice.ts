import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserData { name: string, email: string }

export interface AuthState {
    value: {
        userData: null | UserData
        authed: boolean,
    }
}

const initialState: AuthState = {
    value: {
        userData: null,
        authed: false,
    }
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginAction: (state, action: PayloadAction<UserData>) => {
            state.value = {
                userData: action.payload,
                authed: true
            }
        },
        logoutAction: (state) => {
            state.value = initialState.value
        },
    },
})

// Action creators are generated for each case reducer function
export const { loginAction, logoutAction } = authSlice.actions

export default authSlice.reducer