import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {
    isOpen: false,
    bookId: null,
  },
};

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    openBookModal: (state, action) => {
      state.data.isOpen = true;
      state.data.bookId = action.payload.bookId;
    },
    closeBookModal: (state) => {
      state.data.isOpen = false;
    },
  },
});

export const { openBookModal, closeBookModal } = bookSlice.actions;

export default bookSlice.reducer;
