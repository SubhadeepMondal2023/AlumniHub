import { configureStore } from '@reduxjs/toolkit';
import { alumniApi } from './api/alumniApiSlice';
import { notificationsApi } from './api/notificationsApiSlice';
import { authApi } from "./api/authSlice.js";

const store = configureStore({
  reducer: {
    [alumniApi.reducerPath]: alumniApi.reducer,
    [notificationsApi.reducerPath]: notificationsApi.reducer,
    [authApi.reducerPath]: authApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(alumniApi.middleware, notificationsApi.middleware, authApi.middleware),
});

export default store;
