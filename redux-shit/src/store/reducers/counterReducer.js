import {createSlice} from "@reduxjs/toolkit";
import {fetchUsers} from "../actions/users";

const defaultState = {
    counter: 20,
    lesson: {
        topic: 'Redux Toolkit'
    },
    isLoading: false,
    errors: null,
    users: []
}

export const counterReducer = createSlice({
    name: "counter",
    initialState: defaultState,
    reducers: {
        INCREASE_COUNTER(state, action) {
            state.counter += Number(action.payload)
        },
        DECREASE_COUNTER(state, action) {
            state.counter -= Number(action.payload)
        },
        ADD_USER(state, action) {
            state.users = [...state.users, action.payload]
        },
        REMOVE_USER(state, action) {
            state.users = state.users.filter(u => u.id !== action.payload)
        }
    },
    extraReducers: {
        [fetchUsers.pending]: (state) => {
            state.isLoading = true
        },
        [fetchUsers.fulfilled]: (state, action) => {
            state.isLoading = false
            state.errors = null
            state.users = [...state.users, ...action.payload]
        },
        [fetchUsers.rejected]: (state, action) => {
            state.isLoading = false
            state.errors = action.payload
        },
    }
})

export default counterReducer.reducer
