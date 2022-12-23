import {counterReducer} from "../reducers/counterReducer";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async function(){
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        let data = await response.json()
        data.forEach((item ) => {
            item.id = uid()
            console.log(item.id)
        })

        return data;
    }
)
const uid = () =>
    String(
        Date.now().toString(32) +
        Math.random().toString(16)
    ).replace(/\./g, '')