import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    data: {
        book: false,
        user: false,
        order: false,
    }
}

export const reloadSlice = createSlice({
    name: 'reload',
    initialState,
    reducers: {
        reloadBook: (state) => {
            state.data.book = !state.data.book;
        },
        reloadUser: (state) => {
            state.data.user = !state.data.user;
        },
        reloadOrder: (state) => {
            state.data.order = !state.data.order;
        }
    }
})

export const { reloadBook, reloadUser, reloadOrder } = reloadSlice.actions;
export default reloadSlice.reducer;