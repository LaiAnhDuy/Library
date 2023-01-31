import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    data: {
        book: false,
        user: false,
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
        }
    }
})

export const { reloadBook, reloadUser } = reloadSlice.actions;
export default reloadSlice.reducer;