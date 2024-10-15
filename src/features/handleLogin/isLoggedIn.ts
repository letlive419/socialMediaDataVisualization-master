import {createSlice} from "@reduxjs/toolkit"
import type { RootState } from "../../app/store"




const initialState = {
    value:false
}

export const loginSlice = createSlice({
    name: 'verifier',
    initialState,
    reducers: {
        setStateTrue: state => {
            state.value = true
        },
        setStateFalse: state => {
            state.value = false
        }
    }
})
export const {setStateTrue, setStateFalse} = loginSlice.actions

export const selectVerifier = (state: RootState) => state.isLoggedIn.value

export default loginSlice.reducer