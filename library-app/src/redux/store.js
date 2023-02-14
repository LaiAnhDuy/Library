import { configureStore } from '@reduxjs/toolkit';
import alertSlice from './alertSlice';
import bookSlice from './bookSlice';
import loadingSlice from './loadingSlice';
import orderSlice from './orderSlice';
import reloadSlice from './reloadSlice';

export const store = configureStore({
  reducer: {
    loading: loadingSlice,
    alert: alertSlice,
    order: orderSlice,
    book: bookSlice,
    reload: reloadSlice,
  },
});
