import { createSlice } from "@reduxjs/toolkit";

const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        loading: false,
        error: false,
        success: false,
        data: {}
    },
    reducers: {
        pending(state, action) {
            state.loading = true
        },
        success(state, action) {
            state.loading = false
            state.success = true
            state.error = false
            state.data = action.payload
        },
        error(state, action) {
            state.error = true
        }
    }

})

export const weatherActions = weatherSlice.actions
export default weatherSlice