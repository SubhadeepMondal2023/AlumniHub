import { configureStore } from '@reduxjs/toolkit';
import { notificationsApi } from './api/notificationsApiSlice';

const store = configureStore({
  reducer: {
    [notificationsApi.reducerPath]: notificationsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(notificationsApi.middleware),
});

export default store;
