import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "interface/User";


export interface IAuthState{
    isLoggedIn: boolean;
    logging?: boolean;
    currentUser?: User
}

export interface IPayloadLogin {
    username : string;
    password : string;
}

const initialState: IAuthState = {
    isLoggedIn: false,
    logging: false,
    currentUser: undefined
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        login(state,action: PayloadAction<IPayloadLogin>) {
            state.logging = true    
        },
        loginSuccess(state,action: PayloadAction<User>) {
            state.logging = false
            state.currentUser = action.payload
            state.isLoggedIn = true
        },
        loginFailed(state,action: PayloadAction<string>) {
            state.logging = false
        },
        
        logout(state) {
            state.isLoggedIn = false;
            state.logging = false;
        }
    }
})

/// ACTION 
export const authActions = authSlice.actions;
// SELECTOR

export const selectIsLoggedIn = (state:any) => state.auth.isLoggedIn
export const selectIsLogging = (state:any) => state.auth.isLogging

// REDUCER


const authReducer = authSlice.reducer
export default authReducer