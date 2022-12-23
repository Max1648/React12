import {combineReducers} from "redux";
import counterReducer from "./reducers/counterReducer";
import {configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    counterReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: [thunk]
    })
}
