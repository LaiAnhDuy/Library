import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: {
        isOpen: false,
        orderId: null,
    }
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        openOrderModal: (state, action) => {
            state.data.isOpen = true;
            state.data.orderId = action.payload;
        },
        closeOrderModal: (state) => {
            state.data.isOpen = false;
        }
    }
})

export const { openOrderModal, closeOrderModal } = orderSlice.actions;

export default orderSlice.reducer;